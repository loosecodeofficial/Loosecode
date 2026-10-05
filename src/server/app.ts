import express, { type Request, type Response } from 'express';
import { generateCertificate, validateNameInput } from './certificateService.js';

export const app = express();

app.use(express.json());

// Endpoint: POST /api/certificates/generate
app.post('/api/certificates/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body || {};

    const validation = validateNameInput(name);
    if (!validation.valid) {
      res.status(validation.statusCode || 400).json({ error: validation.error });
      return;
    }

    const sanitizedName = validation.name!;
    const { pdfBuffer, previewDataUrl } = await generateCertificate(sanitizedName);

    const acceptHeader = req.get('Accept') || '';
    const formatQuery = req.query.format;

    if (acceptHeader.includes('application/json') || formatQuery === 'json') {
      const base64Pdf = pdfBuffer.toString('base64');
      res.json({
        success: true,
        name: sanitizedName,
        pdfBase64: `data:application/pdf;base64,${base64Pdf}`,
        previewDataUrl,
        fileName: `certificate_${sanitizedName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`,
      });
      return;
    }

    // Default: PDF stream response
    const safeFileName = sanitizedName.replace(/[^a-zA-Z0-9_-]/g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="certificate_${safeFileName}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (err: any) {
    console.error('Certificate generation error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate certificate' });
  }
});
