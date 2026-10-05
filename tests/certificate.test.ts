import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import http from 'http';
import { generateCertificate, validateNameInput } from '../src/server/certificateService.js';
import { app } from '../src/server/app.js';

describe('Certificate Service & API Tests', () => {
  let server: http.Server;
  let baseUrl: string;

  test('0. Setup HTTP Test Server', async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const address = server.address() as any;
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });
    assert.ok(baseUrl);
  });

  test('1. Valid name -> certificate generated successfully', async () => {
    const { pdfBuffer, previewDataUrl } = await generateCertificate('Kiran Teja');
    assert.ok(pdfBuffer instanceof Buffer);
    assert.ok(pdfBuffer.length > 10000, 'PDF buffer should be substantial');
    assert.equal(pdfBuffer.toString('utf8', 0, 5), '%PDF-');
    assert.ok(previewDataUrl.startsWith('data:image/svg+xml;utf8,'));
  });

  test('2. Empty name -> validation error', () => {
    const res = validateNameInput('');
    assert.equal(res.valid, false);
    assert.equal(res.error, 'Name cannot be empty or only spaces');
    assert.equal(res.statusCode, 400);
  });

  test('3. Whitespace-only name -> validation error', () => {
    const res = validateNameInput('   \t  \n  ');
    assert.equal(res.valid, false);
    assert.equal(res.error, 'Name cannot be empty or only spaces');
    assert.equal(res.statusCode, 400);
  });

  test('4. Name too short (<2 chars) -> validation error', () => {
    const res = validateNameInput('A');
    assert.equal(res.valid, false);
    assert.equal(res.error, 'Name must be at least 2 characters long');
  });

  test('5. Name too long (>60 chars) -> validation error', () => {
    const longName = 'A'.repeat(61);
    const res = validateNameInput(longName);
    assert.equal(res.valid, false);
    assert.equal(res.error, 'Name is too long (maximum 60 characters)');
  });

  test('6. Long name (valid 50 chars) -> scales font and generates valid PDF', async () => {
    const longName = 'Alexander Bartholomew Montgomery-Wellington III';
    const { pdfBuffer } = await generateCertificate(longName);
    assert.ok(pdfBuffer.length > 10000);
    assert.equal(pdfBuffer.toString('utf8', 0, 5), '%PDF-');
  });

  test('7. Special characters in names -> generates correctly', async () => {
    const specialName = 'Renée d\'Artagnan-Müller';
    const { pdfBuffer } = await generateCertificate(specialName);
    assert.ok(pdfBuffer.length > 10000);
    assert.equal(pdfBuffer.toString('utf8', 0, 5), '%PDF-');
  });

  test('8. Multiple users generating certificates simultaneously (concurrency)', async () => {
    const names = ['Alice Smith', 'Bob Jones', 'Charlie Brown', 'Diana Prince', 'Evan Wright'];
    const results = await Promise.all(names.map((n) => generateCertificate(n)));
    assert.equal(results.length, 5);
    for (const res of results) {
      assert.ok(res.pdfBuffer.length > 10000);
      assert.equal(res.pdfBuffer.toString('utf8', 0, 5), '%PDF-');
      assert.ok(res.previewDataUrl.startsWith('data:image/svg+xml;utf8,'));
    }
  });

  test('9. Missing/invalid template -> proper server error', async () => {
    await assert.rejects(
      async () => {
        await generateCertificate('Test User', {
          templatePath: path.resolve('public/images/non_existent_template.jpg'),
        });
      },
      (err: any) => {
        return err.message.includes('Certificate template file not found');
      }
    );
  });

  test('10. HTTP API POST /api/certificates/generate - PDF Response', async () => {
    const res = await fetch(`${baseUrl}/api/certificates/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Kiran Teja' }),
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), 'application/pdf');
    const arrayBuf = await res.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuf);
    assert.equal(pdfBuffer.toString('utf8', 0, 5), '%PDF-');
  });

  test('11. HTTP API POST /api/certificates/generate - JSON Response with previewDataUrl', async () => {
    const res = await fetch(`${baseUrl}/api/certificates/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name: 'Kiran Teja' }),
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.name, 'Kiran Teja');
    assert.ok(body.pdfBase64.startsWith('data:application/pdf;base64,'));
    assert.ok(body.previewDataUrl.startsWith('data:image/svg+xml;utf8,'));
  });

  test('12. HTTP API POST /api/certificates/generate - 400 Bad Request on empty name', async () => {
    const res = await fetch(`${baseUrl}/api/certificates/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '   ' }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error, 'Name cannot be empty or only spaces');
  });

  test('13. Teardown HTTP Test Server', () => {
    server.close();
  });
});
