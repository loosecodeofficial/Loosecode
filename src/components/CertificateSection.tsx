import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Award, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/audio';

import { generateCertificateClient } from '../utils/clientCertificateService';

export default function CertificateSection() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [generatedName, setGeneratedName] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('certificate.pdf');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playBlip(600);

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Please enter your full name');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    if (trimmedName.length > 60) {
      setError('Name is too long (maximum 60 characters)');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await generateCertificateClient(trimmedName);

      setPdfDataUrl(data.pdfBase64);
      setPreviewDataUrl(data.previewDataUrl || data.pdfBase64);
      setGeneratedName(data.name);
      setFileName(data.fileName || `certificate_${data.name.replace(/\s+/g, '_')}.pdf`);
      sounds.playBlip(900);
    } catch (err: any) {
      console.error('Certificate generation error:', err);
      const errorMessage =
        typeof err === 'string'
          ? err
          : err?.message
          ? err.message
          : typeof err?.error === 'string'
          ? err.error
          : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfDataUrl) return;
    sounds.playBlip(800);

    try {
      // Convert base64 data URI to Blob for maximum browser compatibility
      const base64Parts = pdfDataUrl.split(',');
      const byteCharacters = atob(base64Parts[1] || base64Parts[0]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch {
      const link = document.createElement('a');
      link.href = pdfDataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setPdfDataUrl(null);
    setPreviewDataUrl(null);
    setGeneratedName(null);
    setError(null);
  };

  return (
    <section id="certificate" className="relative z-20 w-full py-24 px-5 sm:px-10 bg-[#080808] text-white overflow-hidden select-text">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0038ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B3EB16]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0038ff]/40 bg-[#0038ff]/10 text-[#0038ff] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6"
        >
          <Award className="w-4 h-4" />
          <span>OFFICIAL PARTICIPATION CERTIFICATE</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Space_Grotesk',sans-serif] text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight mb-4"
        >
          CLAIM YOUR <span className="text-[#0038ff]">CERTIFICATE</span>
        </motion.h2>

        {/* Short Explanation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-base sm:text-lg max-w-xl mb-10 font-light"
        >
          Enter your name to generate your official event participation certificate for RIZZ & CODE 2026.
        </motion.p>

        {/* Main Certificate Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-full bg-[#111113] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative z-20 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!previewDataUrl ? (
              /* Input Form State */
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleGenerate}
                className="flex flex-col gap-6 text-left max-w-lg mx-auto"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="attendee-name" className="text-sm font-bold uppercase tracking-wider text-white/90">
                    Enter your name <span className="text-[#0038ff]">*</span>
                  </label>
                  <input
                    id="attendee-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your full name"
                    disabled={loading}
                    autoComplete="name"
                    className="w-full px-5 py-4 rounded-xl bg-[#080808] border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#0038ff] focus:ring-2 focus:ring-[#0038ff]/30 transition-all font-medium text-base sm:text-lg select-text pointer-events-auto"
                  />
                </div>

                {/* Validation Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full py-4 px-8 rounded-xl bg-[#0038ff] hover:bg-[#002ecc] disabled:bg-[#0038ff]/50 text-white font-bold uppercase tracking-wider text-base transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-[#0038ff]/25 hover:shadow-[#0038ff]/40 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Certificate...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Certificate</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Generated Clean Preview State */
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Success Header */}
                <div className="flex items-center gap-2 text-[#B3EB16] font-bold text-lg uppercase tracking-wider">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Certificate Generated for {generatedName}!</span>
                </div>

                {/* Pristine Clean Certificate Image Preview (No PDF upper toolbar, no right scrollbar) */}
                <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl relative group">
                  <img
                    src={previewDataUrl}
                    alt={`Certificate for ${generatedName}`}
                    className="w-full h-auto object-contain block rounded-2xl"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-lg mt-2">
                  <button
                    onClick={handleDownload}
                    onMouseEnter={() => sounds.playHover()}
                    className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-xl bg-[#B3EB16] text-[#080808] hover:bg-[#a1d613] font-bold uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-[#B3EB16]/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>Download Certificate</span>
                  </button>

                  <button
                    onClick={handleReset}
                    onMouseEnter={() => sounds.playHover()}
                    className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white hover:text-white font-bold uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span>Generate Another</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
