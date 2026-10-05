import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

export const REGISTERED_CERTIFICATE_EMAILS = [
  '23bk1a66f7@gmail.com',
  '23bk1a66j2@gmail.com',
  '23bk1a66j3@gmail.com',
  '23bk1a66d1@gmail.com',
  '23bk1a66g1@gmail.com',
  '23bk1a66g0@gmail.com',
  '23bk1a66f9@gmail.com',
];

interface CertificateDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl?: string;
  eventName?: string;
}

export default function CertificateDownloadModal({
  isOpen,
  onClose,
  certificateUrl,
  eventName = 'FORGE AI',
}: CertificateDownloadModalProps) {
  const [registeredMailId, setRegisteredMailId] = useState('');
  const [registeredMobile, setRegisteredMobile] = useState('');
  const [resolvedUrl, setResolvedUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    sounds.playPop();
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const email = registeredMailId.trim().toLowerCase();
    const mobile = registeredMobile.trim();

    // Basic validation
    if (!email) {
      setError('Please enter your Register Mail ID');
      return;
    }
    if (!mobile) {
      setError('Please enter your Register Mobile Number');
      return;
    }

    // Check if email matches registered list
    const isRegistered = REGISTERED_CERTIFICATE_EMAILS.some(
      (regEmail) => regEmail.toLowerCase() === email
    );

    if (!isRegistered) {
      sounds.playPop();
      setError('No certificate found for this registered email ID. Please check your email or contact support.');
      return;
    }

    sounds.playBlip(700);

    // Extract roll number (e.g. 23bk1a66f7 from 23bk1a66f7@gmail.com)
    const rollNumber = email.split('@')[0];
    const targetFile = certificateUrl || `/certificates/${rollNumber}.png`;
    setResolvedUrl(targetFile);

    // Trigger download of the certificate
    const link = document.createElement('a');
    link.href = targetFile;
    link.download = `${rollNumber.toUpperCase()}_${eventName.replace(/\s+/g, '_')}_Certificate.png`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-[#121214] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-2xl z-10 my-auto max-h-[92vh] overflow-y-auto"
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400">
                {eventName} • Participation Certificate
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                Download Certificate
              </h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              onMouseEnter={() => sounds.playHover()}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {!isSuccess ? (
            /* Form View */
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Please enter your registered event details below to download your official {eventName} participation certificate.
              </p>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Field 1: Register Mail ID */}
              <div className="space-y-1.5">
                <label
                  htmlFor="cert-registered-mail-id"
                  className="block text-xs font-semibold uppercase tracking-wide text-gray-200"
                >
                  Register Mail ID <span className="text-blue-400">*</span>
                </label>
                <input
                  id="cert-registered-mail-id"
                  type="email"
                  required
                  value={registeredMailId}
                  onChange={(e) => setRegisteredMailId(e.target.value)}
                  placeholder="registered@example.com"
                  className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#1a1a1e] border border-white/15 text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <span className="block text-[11px] text-gray-400">
                  The email used during Luma / event registration
                </span>
              </div>

              {/* Field 3: Register Mobile Number */}
              <div className="space-y-1.5">
                <label
                  htmlFor="cert-registered-mobile"
                  className="block text-xs font-semibold uppercase tracking-wide text-gray-200"
                >
                  Register Mobile Number <span className="text-blue-400">*</span>
                </label>
                <input
                  id="cert-registered-mobile"
                  type="tel"
                  required
                  value={registeredMobile}
                  onChange={(e) => setRegisteredMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#1a1a1e] border border-white/15 text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <span className="block text-[11px] text-gray-400">
                  Mobile number entered when registering
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors cursor-pointer order-2 sm:order-1"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onMouseEnter={() => sounds.playHover()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0040cc] text-white text-sm font-semibold transition-colors cursor-pointer shadow-md order-1 sm:order-2"
                >
                  <Download size={16} />
                  <span>Download Certificate</span>
                </button>
              </div>
            </form>
          ) : (
            /* Success View */
            <div className="mt-6 text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 size={26} />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  Download Initiated!
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                  Your participation certificate has been downloaded. If the download did not start automatically, click the button below.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={resolvedUrl || certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <ExternalLink size={15} />
                  <span>View Certificate</span>
                </a>

                <a
                  href={resolvedUrl || certificateUrl}
                  download={resolvedUrl ? resolvedUrl.split('/').pop() : 'ForgeAI_Certificate.png'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0040cc] text-white text-sm font-semibold transition-colors cursor-pointer shadow-md"
                >
                  <Download size={15} />
                  <span>Download Again</span>
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
