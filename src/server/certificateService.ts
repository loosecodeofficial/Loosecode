import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export interface CertificateConfig {
  templatePath: string;
  canvasWidth: number;
  canvasHeight: number;
  name: {
    x: number;
    y: number;
    maxWidth: number;
    defaultFontSize: number;
    minFontSize: number;
    fontPath: string;
    color: { r: number; g: number; b: number };
    alignment: 'center' | 'left' | 'right';
  };
}

export const certificateConfig: CertificateConfig = {
  templatePath: path.resolve(process.cwd(), 'public/images/certificate_template.jpg'),
  canvasWidth: 1024,
  canvasHeight: 724,
  name: {
    x: 512,
    y: 264, // Lowered baseline Y so top of text does not collide with "THIS IS TO CERTIFY THAT"
    maxWidth: 640,
    defaultFontSize: 32, // Reduced default font size for optimal clearance and proportion
    minFontSize: 16,
    fontPath: path.resolve(process.cwd(), 'public/fonts/formula/PPFormula-CondensedBlack.ttf'),
    color: { r: 0.03, g: 0.03, b: 0.03 },
    alignment: 'center',
  },
};

export interface ValidationResult {
  valid: boolean;
  name?: string;
  error?: string;
  statusCode?: number;
}

export function validateNameInput(rawName: any): ValidationResult {
  if (rawName === undefined || rawName === null || typeof rawName !== 'string') {
    return { valid: false, error: 'Name is required', statusCode: 400 };
  }

  const trimmed = rawName.trim().replace(/\s+/g, ' ');

  if (trimmed.length === 0) {
    return { valid: false, error: 'Name cannot be empty or only spaces', statusCode: 400 };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters long', statusCode: 400 };
  }

  if (trimmed.length > 60) {
    return { valid: false, error: 'Name is too long (maximum 60 characters)', statusCode: 400 };
  }

  // Basic sanitization: remove potential control characters or illegal null bytes
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

export interface CertificateGenerationResult {
  pdfBuffer: Buffer;
  previewDataUrl: string;
}

export async function generateCertificate(
  nameInput: string,
  configOverride?: Partial<CertificateConfig>
): Promise<CertificateGenerationResult> {
  const config: CertificateConfig = {
    ...certificateConfig,
    ...configOverride,
    name: {
      ...certificateConfig.name,
      ...(configOverride?.name || {}),
    },
  };

  const validation = validateNameInput(nameInput);
  if (!validation.valid || !validation.name) {
    throw new Error(validation.error || 'Invalid name input');
  }

  const attendeeName = validation.name;

  if (!fs.existsSync(config.templatePath)) {
    throw new Error(`Certificate template file not found at path: ${config.templatePath}`);
  }

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const imageBytes = fs.readFileSync(config.templatePath);
  let templateImg;
  if (config.templatePath.endsWith('.png')) {
    templateImg = await pdfDoc.embedPng(imageBytes);
  } else {
    templateImg = await pdfDoc.embedJpg(imageBytes);
  }

  const width = config.canvasWidth || templateImg.width;
  const height = config.canvasHeight || templateImg.height;

  const page = pdfDoc.addPage([width, height]);
  page.drawImage(templateImg, {
    x: 0,
    y: 0,
    width,
    height,
  });

  let font;
  let fontBytes: Buffer | null = null;

  if (fs.existsSync(config.name.fontPath)) {
    try {
      fontBytes = fs.readFileSync(config.name.fontPath);
      font = await pdfDoc.embedFont(fontBytes);
    } catch {
      font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }
  } else {
    font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  let fontSize = config.name.defaultFontSize;
  let textWidth = font.widthOfTextAtSize(attendeeName, fontSize);

  if (textWidth > config.name.maxWidth) {
    const scaleFactor = config.name.maxWidth / textWidth;
    fontSize = Math.max(config.name.minFontSize, Math.floor(fontSize * scaleFactor));
    textWidth = font.widthOfTextAtSize(attendeeName, fontSize);
  }

  let posX = config.name.x;
  if (config.name.alignment === 'center') {
    posX = (width - textWidth) / 2;
  } else if (config.name.alignment === 'right') {
    posX = config.name.x - textWidth;
  }

  page.drawText(attendeeName, {
    x: posX,
    y: config.name.y,
    size: fontSize,
    font,
    color: rgb(config.name.color.r, config.name.color.g, config.name.color.b),
  });

  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);

  // Generate clean SVG image data URL for frontend UI preview (no PDF toolbar/scrollbars)
  const base64Img = imageBytes.toString('base64');
  const base64Font = fontBytes ? fontBytes.toString('base64') : '';
  const svgY = height - config.name.y;

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
  <text x="${config.name.x}" y="${svgY}" class="cert-name-style">${escapeXml(attendeeName)}</text>
</svg>`.trim();

  const previewDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

  return {
    pdfBuffer,
    previewDataUrl,
  };
}
