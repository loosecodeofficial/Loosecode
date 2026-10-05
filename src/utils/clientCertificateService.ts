import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export interface ClientValidationResult {
  valid: boolean;
  name?: string;
  error?: string;
}

export function validateNameInput(rawName: any): ClientValidationResult {
  if (rawName === undefined || rawName === null || typeof rawName !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const trimmed = rawName.trim().replace(/\s+/g, ' ');

  if (trimmed.length === 0) {
    return { valid: false, error: 'Name cannot be empty or only spaces' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters long' };
  }

  if (trimmed.length > 60) {
    return { valid: false, error: 'Name is too long (maximum 60 characters)' };
  }

  // Basic sanitization: remove control characters
  // oxlint-disable-next-line no-control-regex
  const sanitized = trimmed.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

  return { valid: true, name: sanitized };
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  const chunkSize = 8192;
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, len));
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  return btoa(binary);
}

export interface ClientCertificateResult {
  pdfBase64: string;
  previewDataUrl: string;
  name: string;
  fileName: string;
}

export async function generateCertificateClient(nameInput: string): Promise<ClientCertificateResult> {
  const validation = validateNameInput(nameInput);
  if (!validation.valid || !validation.name) {
    throw new Error(validation.error || 'Invalid name input');
  }

  const attendeeName = validation.name;
  const width = 1024;
  const height = 724;

  // 1. Fetch template image
  let imageBytes: Uint8Array;
  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
  const primaryImagePath = `${baseUrl.replace(/\/$/, '')}/images/certificate_template.jpg`;

  try {
    const res = await fetch(primaryImagePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    imageBytes = new Uint8Array(buf);
  } catch {
    // Secondary fallback directly to root images
    const res = await fetch('/images/certificate_template.jpg');
    if (!res.ok) {
      throw new Error('Failed to load certificate template image.');
    }
    const buf = await res.arrayBuffer();
    imageBytes = new Uint8Array(buf);
  }

  // 2. Fetch custom font if available
  let fontBytes: Uint8Array | null = null;
  try {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const fontUrl = `${baseUrl.replace(/\/$/, '')}/fonts/formula/PPFormula-CondensedBlack.ttf`;
    const res = await fetch(fontUrl);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      fontBytes = new Uint8Array(buf);
    }
  } catch {
    // Fallback to standard font if font fetch fails
    fontBytes = null;
  }

  // 3. Build PDF with pdf-lib
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const templateImg = await pdfDoc.embedJpg(imageBytes);
  const page = pdfDoc.addPage([width, height]);

  page.drawImage(templateImg, {
    x: 0,
    y: 0,
    width,
    height,
  });

  let font;
  if (fontBytes) {
    try {
      font = await pdfDoc.embedFont(fontBytes);
    } catch {
      font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }
  } else {
    font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  const maxWidth = 640;
  const defaultFontSize = 32;
  const minFontSize = 16;
  const targetX = 512;
  const targetY = 264;

  let fontSize = defaultFontSize;
  let textWidth = font.widthOfTextAtSize(attendeeName, fontSize);

  if (textWidth > maxWidth) {
    const scaleFactor = maxWidth / textWidth;
    fontSize = Math.max(minFontSize, Math.floor(fontSize * scaleFactor));
    textWidth = font.widthOfTextAtSize(attendeeName, fontSize);
  }

  const posX = (width - textWidth) / 2;

  page.drawText(attendeeName, {
    x: posX,
    y: targetY,
    size: fontSize,
    font,
    color: rgb(0.03, 0.03, 0.03),
  });

  const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });

  // 4. Generate clean SVG image data URL for frontend UI preview
  const base64Img = uint8ArrayToBase64(imageBytes);
  const base64Font = fontBytes ? uint8ArrayToBase64(fontBytes) : '';
  const svgY = height - targetY;

  const fontStyle = base64Font
    ? `@font-face {
        font-family: 'CertNameFont';
        src: url('data:font/ttf;charset=utf-8;base64,${base64Font}') format('truetype');
      }
      .cert-name-style {
        font-family: 'CertNameFont', sans-serif;
        font-size: ${fontSize}px;
        fill: #080808;
        text-anchor: middle;
        dominant-baseline: alphabetic;
      }`
    : `.cert-name-style {
        font-family: sans-serif;
        font-size: ${fontSize}px;
        font-weight: bold;
        fill: #080808;
        text-anchor: middle;
        dominant-baseline: alphabetic;
      }`;

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>${fontStyle}</style>
  </defs>
  <image href="data:image/jpeg;base64,${base64Img}" x="0" y="0" width="${width}" height="${height}" />
  <text x="${targetX}" y="${svgY}" class="cert-name-style">${escapeXml(attendeeName)}</text>
</svg>`.trim();

  const previewDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  const safeFileName = attendeeName.replace(/[^a-zA-Z0-9_-]/g, '_');

  return {
    pdfBase64,
    previewDataUrl,
    name: attendeeName,
    fileName: `certificate_${safeFileName}.pdf`,
  };
}
