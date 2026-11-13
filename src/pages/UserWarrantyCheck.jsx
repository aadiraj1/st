import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Car,
  MapPin,
  Phone,
  Sparkles,
  Zap,
  Printer,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Download,
  CreditCard
} from 'lucide-react';
import localWarranties from '../data/userWarranties.json';

const UserWarrantyCheck = () => {
  const [serial, setSerial] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [warrantyData, setWarrantyData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [allWarranties, setAllWarranties] = useState(localWarranties);
  const [now, setNow] = useState(new Date());

  // Dynamic fetch with cache-busting to pick up updates directly from public JSON
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const basePath = import.meta.env.BASE_URL || '/';
        const url = `${basePath.endsWith('/') ? basePath : basePath + '/'}data/userWarranties.json?t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            setAllWarranties(json);
          }
        }
      } catch (err) {
        // Fallback to local import already initialized
      }
    };
    fetchLatestData();
  }, []);

  // Update clock every second for live real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to normalize serial numbers (removes whitespace/hyphens for easy matching)
  const normalize = (str) => (str || '').replace(/[\s-]/g, '').toLowerCase();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!serial.trim()) return;

    setIsSearching(true);
    setNotFound(false);
    setWarrantyData(null);

    setTimeout(() => {
      const cleanInput = normalize(serial);
      const match = allWarranties.find((w) => normalize(w.warrantyNumber) === cleanInput);

      if (match) {
        setWarrantyData(match);
        setNotFound(false);
      } else {
        setWarrantyData(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 600);
  };

  // Format serial as user types (4-4-4-4)
  const handleInputChange = (e) => {
    let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const chunks = val.match(/.{1,4}/g);
    setSerial(chunks ? chunks.join(' ') : val);
  };

  // Copy warranty number
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print warranty certificate
  const handlePrint = () => {
    window.print();
  };

  // Calculate real-time warranty remaining time & percentages
  const timeDetails = useMemo(() => {
    if (!warrantyData) return null;

    const [iYear, iMonth, iDay] = (warrantyData.installationDate || '').split('-').map(Number);
    const installDate = new Date(iYear, iMonth - 1, iDay);
    const years = Number(warrantyData.warrantyYears) || 5;

    const expiryDate = new Date(iYear + years, iMonth - 1, iDay);

    const totalDurationMs = expiryDate.getTime() - installDate.getTime();
    const remainingMs = expiryDate.getTime() - now.getTime();
    const isExpired = remainingMs <= 0;

    if (isExpired) {
      return {
        isExpired: true,
        percentRemaining: 0,
        yearsRemaining: 0,
        daysRemaining: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
        secondsRemaining: 0,
        expiryFormatted: expiryDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        installFormatted: installDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        totalDaysRemaining: 0
      };
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const days = totalDays % 365;
    const remYears = Math.floor(totalDays / 365);

    const percent = Math.max(0, Math.min(100, (remainingMs / totalDurationMs) * 100));

    return {
      isExpired: false,
      percentRemaining: percent.toFixed(2),
      yearsRemaining: remYears,
      daysRemaining: days,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      secondsRemaining: seconds,
      totalDaysRemaining: totalDays,
      expiryFormatted: expiryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      installFormatted: installDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  }, [warrantyData, now]);

  // Download High-Resolution Luxury Warranty Card Image (PNG)
  const handleDownloadCard = () => {
    if (!warrantyData || !timeDetails) return;
    setDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const width = 1600;
      const height = 1008;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Helper: Rounded Rectangle
      const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      };

      // Clip Card Outer Bounds (r = 48)
      roundRect(0, 0, width, height, 48);
      ctx.clip();

      // Background: Obsidian Carbon Gradient
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#161b26');
      bg.addColorStop(0.35, '#0e121a');
      bg.addColorStop(0.7, '#07090e');
      bg.addColorStop(1, '#020305');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Fine Carbon Micro-Texture Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Ambient Electric Cyan Radial Glow
      const glowTopRight = ctx.createRadialGradient(width - 150, 150, 10, width - 150, 150, 600);
      glowTopRight.addColorStop(0, 'rgba(0, 174, 239, 0.22)');
      glowTopRight.addColorStop(1, 'rgba(0, 174, 239, 0)');
      ctx.fillStyle = glowTopRight;
      ctx.fillRect(0, 0, width, height);

      const glowBottomLeft = ctx.createRadialGradient(150, height - 150, 10, 150, height - 150, 500);
      glowBottomLeft.addColorStop(0, 'rgba(0, 174, 239, 0.12)');
      glowBottomLeft.addColorStop(1, 'rgba(0, 174, 239, 0)');
      ctx.fillStyle = glowBottomLeft;
      ctx.fillRect(0, 0, width, height);

      // Outer Dual Metallic Borders
      roundRect(16, 16, width - 32, height - 32, 40);
      ctx.strokeStyle = 'rgba(0, 174, 239, 0.45)';
      ctx.lineWidth = 3;
      ctx.stroke();

      roundRect(28, 28, width - 56, height - 56, 32);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Corner Precision Brackets
      const drawBracket = (x, y, dx, dy) => {
        ctx.strokeStyle = '#00AEEF';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, y + dy * 32);
        ctx.lineTo(x, y);
        ctx.lineTo(x + dx * 32, y);
        ctx.stroke();
      };
      drawBracket(46, 46, 1, 1);
      drawBracket(width - 46, 46, -1, 1);
      drawBracket(46, height - 46, 1, -1);
      drawBracket(width - 46, height - 46, -1, -1);

      // Brand Logo Header
      ctx.fillStyle = '#00AEEF';
      ctx.font = '900 italic 56px "Arial Black", sans-serif';
      ctx.fillText('STARKX', 70, 122);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 italic 56px "Arial Black", sans-serif';
      ctx.fillText('STUDIOS', 315, 122);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '800 13px sans-serif';
      ctx.fillText('OFFICIAL PPF DIGITAL WARRANTY PASSPORT', 72, 150);

      // Golden Smart Chip
      const chipX = 70;
      const chipY = 195;
      const chipW = 120;
      const chipH = 92;
      const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
      chipGrad.addColorStop(0, '#e8c36b');
      chipGrad.addColorStop(0.5, '#cda439');
      chipGrad.addColorStop(1, '#8f6e1a');
      roundRect(chipX, chipY, chipW, chipH, 12);
      ctx.fillStyle = chipGrad;
      ctx.fill();
      ctx.strokeStyle = '#ffe494';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chip Circuit Lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(chipX + 36, chipY);
      ctx.lineTo(chipX + 36, chipY + chipH);
      ctx.moveTo(chipX + 84, chipY);
      ctx.lineTo(chipX + 84, chipY + chipH);
      ctx.moveTo(chipX, chipY + 46);
      ctx.lineTo(chipX + chipW, chipY + 46);
      ctx.stroke();

      // Contactless Wave Icon
      const waveX = 225;
      const waveY = 240;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 3;
      for (let r = 14; r <= 32; r += 9) {
        ctx.beginPath();
        ctx.arc(waveX, waveY, r, -0.6, 0.6);
        ctx.stroke();
      }

      // Security Hologram Seal
      const sealX = width - 175;
      const sealY = 125;
      const sealGrad = ctx.createRadialGradient(sealX, sealY, 5, sealX, sealY, 65);
      sealGrad.addColorStop(0, 'rgba(0, 174, 239, 0.35)');
      sealGrad.addColorStop(0.7, 'rgba(0, 255, 180, 0.2)');
      sealGrad.addColorStop(1, 'rgba(0, 174, 239, 0)');
      ctx.fillStyle = sealGrad;
      ctx.beginPath();
      ctx.arc(sealX, sealY, 65, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(0, 174, 239, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(sealX, sealY, 55, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#00AEEF';
      ctx.font = '900 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STARKX GUARANTEE', sealX, sealY - 10);
      ctx.fillStyle = '#00FF66';
      ctx.font = '900 13px sans-serif';
      ctx.fillText('VERIFIED', sealX, sealY + 8);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.font = '700 9px sans-serif';
      ctx.fillText('GENUINE PPF', sealX, sealY + 22);
      ctx.textAlign = 'left';

      // Status Pill
      const statusText = timeDetails?.isExpired ? 'EXPIRED' : 'ACTIVE & PROTECTED';
      const statusColor = timeDetails?.isExpired ? '#FF4444' : '#00FF66';
      ctx.fillStyle = timeDetails?.isExpired ? 'rgba(255,68,68,0.15)' : 'rgba(0,255,102,0.12)';
      roundRect(width - 370, 205, 300, 44, 22);
      ctx.fill();
      ctx.strokeStyle = statusColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = statusColor;
      ctx.beginPath();
      ctx.arc(width - 345, 227, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 12px sans-serif';
      ctx.fillText(statusText, width - 325, 232);

      // Embossed Serial Code
      ctx.fillStyle = '#00AEEF';
      ctx.font = '900 52px "Courier New", monospace';
      ctx.shadowColor = 'rgba(0, 174, 239, 0.55)';
      ctx.shadowBlur = 12;
      ctx.fillText(warrantyData.warrantyNumber, 70, 395);
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '800 11px sans-serif';
      ctx.fillText('OFFICIAL SERIAL REGISTRATION CODE', 72, 425);

      // Separator Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(70, 460);
      ctx.lineTo(width - 70, 460);
      ctx.stroke();

      // Data Grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '800 12px sans-serif';
      ctx.fillText('PROTECTED VEHICLE', 70, 505);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 32px sans-serif';
      ctx.fillText(warrantyData.carName || 'Vehicle', 70, 545);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '800 12px sans-serif';
      ctx.fillText('REGISTERED OWNER', 70, 615);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 24px sans-serif';
      ctx.fillText(warrantyData.customerName || 'Verified Client', 70, 650);

      // Right Grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '800 12px sans-serif';
      ctx.fillText('PROTECTION TIER', 850, 505);

      ctx.fillStyle = '#00AEEF';
      ctx.font = '900 32px sans-serif';
      ctx.fillText(`${warrantyData.productVariant} Series`, 850, 545);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '800 12px sans-serif';
      ctx.fillText('OFFICIAL TERM & EXPIRY', 850, 615);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 22px sans-serif';
      ctx.fillText(`${warrantyData.warrantyYears || 5} Years (Expires: ${timeDetails.expiryFormatted})`, 850, 650);

      // Bottom Studio Bar
      roundRect(50, 720, width - 100, 190, 24);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#00AEEF';
      ctx.font = '800 12px sans-serif';
      ctx.fillText('CERTIFIED INSTALLER STUDIO', 85, 765);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 22px sans-serif';
      ctx.fillText(warrantyData.studioName || 'Authorized Starkx Studio', 85, 800);

      if (warrantyData.studioLocation) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '600 15px sans-serif';
        ctx.fillText(warrantyData.studioLocation, 85, 835);
      }

      if (warrantyData.contact) {
        ctx.fillStyle = '#00AEEF';
        ctx.font = '700 15px sans-serif';
        ctx.fillText(`Studio Contact: ${warrantyData.contact}`, 85, 875);
      }

      // Barcode Graphic
      const barX = width - 420;
      const barY = 760;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      const barWidths = [3, 1, 4, 2, 1, 5, 2, 3, 1, 2, 4, 1, 3, 2, 5, 1, 2, 4, 3, 1, 2, 4, 1, 3, 2, 4, 1, 3, 2, 5, 2, 1, 4];
      let curX = barX;
      for (let bw of barWidths) {
        ctx.fillRect(curX, barY, bw, 60);
        curX += bw + 4;
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '700 10px monospace';
      ctx.fillText('STARKX GLOBAL AUTHENTICATION LEDGER', barX, barY + 80);

      // Trigger Direct Image Download
      const cleanNum = (warrantyData.warrantyNumber || 'starkx').replace(/\s+/g, '-');
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `STARKX-Warranty-Card-${cleanNum}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download card error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  return (
    <div className="pt-28 md:pt-36 min-h-screen bg-black text-white pb-32 selection:bg-accent selection:text-black grainy-bg print:bg-black print:text-white print:p-0">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header / Intro - Hidden on Print */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 print:hidden"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
            <Sparkles size={16} className="text-accent animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Official Customer Warranty Portal
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic mb-5">
            Realtime <span className="text-accent underline decoration-4 underline-offset-8">Warranty Check</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Verify your official Starkx Paint Protection Film coverage, view installer studio credentials, and track your remaining warranty time live.
          </p>
        </motion.div>

        {/* Search Panel - Hidden on Print */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] print:hidden"
        >
          {/* Subtle neon ambient glow */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-accent/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

          <form onSubmit={handleSearch} className="relative z-10">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-accent mb-3">
              Enter 16-Digit Warranty Code
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={22}
                />
                <input
                  type="text"
                  required
                  placeholder="e.g. 2000 2000 2000 2044"
                  value={serial}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/15 focus:border-accent rounded-2xl py-4 pl-14 pr-4 font-mono text-lg font-bold tracking-wider placeholder:text-gray-600 outline-none transition-all shadow-inner"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto px-8 py-4 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(0,174,239,0.4)] shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Now</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </div>

            {/* Quick Demo Fill Helper */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-500">Quick Test:</span>
              <button
                type="button"
                onClick={() => {
                  setSerial('2000 2000 2000 2044');
                  setTimeout(() => {
                    const match = allWarranties.find((w) => normalize(w.warrantyNumber) === '2000200020002044');
                    if (match) {
                      setWarrantyData(match);
                      setNotFound(false);
                    }
                  }, 150);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 rounded-lg text-accent font-mono transition-colors cursor-pointer"
              >
                <span>2000 2000 2000 2044</span>
                <span className="text-[10px] bg-accent/30 text-white px-1.5 py-0.5 rounded">Active</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Not Found Alert */}
        <AnimatePresence>
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-red-500/10 border border-red-500/30 p-6 md:p-8 rounded-2xl mb-12 flex items-start gap-4 backdrop-blur-md"
            >
              <ShieldAlert className="text-red-400 shrink-0 mt-1" size={28} />
              <div>
                <h3 className="text-lg font-bold text-red-300 uppercase tracking-wide mb-1">
                  Warranty Record Not Found
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We could not locate an official Starkx warranty matching code{' '}
                  <span className="font-mono text-white font-bold">{serial}</span>.
                </p>
                <ul className="text-xs text-gray-400 list-disc list-inside mt-3 space-y-1">
                  <li>Please double-check the 16-digit code provided on your installation card.</li>
                  <li>Ensure the installing studio has submitted your application into the system.</li>
                  <li>Contact your authorized Starkx installation studio for verification.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verified Warranty Dashboard Display */}
        <AnimatePresence>
          {warrantyData && timeDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
              id="warranty-certificate"
            >
              {/* Main Certificate Card */}
              <div className="relative bg-gradient-to-br from-[#121418] to-[#0a0a0c] border border-accent/40 rounded-3xl p-6 md:p-12 overflow-hidden shadow-[0_0_60px_rgba(0,174,239,0.2)]">
                
                {/* Glowing accents */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 blur-[130px] rounded-full pointer-events-none print:hidden" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 blur-[120px] rounded-full pointer-events-none print:hidden" />

                {/* Top Certificate Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,174,239,0.3)] shrink-0">
                      <ShieldCheck size={36} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                          Verified Protection
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">Authentic Starkx PPF</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                        Digital Warranty Certificate
                      </h2>
                    </div>
                  </div>

                  {/* Status Pill & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border ${
                        timeDetails.isExpired
                          ? 'bg-red-500/10 border-red-500/40 text-red-400'
                          : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${timeDetails.isExpired ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
                      {timeDetails.isExpired ? 'Warranty Expired' : 'Active & Protected'}
                    </div>

                    {/* Download HD Card Button */}
                    <button
                      onClick={handleDownloadCard}
                      disabled={downloading}
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black hover:bg-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,174,239,0.4)] cursor-pointer hover:scale-105 active:scale-95 print:hidden"
                      title="Download high-resolution warranty card image"
                    >
                      {downloading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          <span>Download Card</span>
                        </>
                      )}
                    </button>

                    {/* Print Certificate Button */}
                    <button
                      onClick={handlePrint}
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-200 hover:text-white transition-all cursor-pointer hover:border-accent/40 active:scale-95 print:hidden"
                      title="Print or Save as PDF"
                    >
                      <Printer size={16} />
                      <span>Print Card</span>
                    </button>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* VIP LUXURY PHYSICAL-STYLE WARRANTY CARD DISPLAY */}
                {/* ========================================================================= */}
                <div className="relative max-w-2xl mx-auto mb-10 group">
                  {/* Shimmering Ambient Glow behind card */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-accent/40 via-cyan-500/20 to-accent/40 rounded-[32px] blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                  {/* Card Body */}
                  <div className="relative aspect-[1.586/1] w-full rounded-[26px] p-6 md:p-8 bg-gradient-to-br from-[#161a24] via-[#0d1017] to-[#040508] border border-accent/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden">
                    
                    {/* Metallic micro-lines & radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_6px)]" />

                    {/* Top Row: Brand & Holographic Badge */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-accent">STARKX</span>
                          <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white">STUDIOS</span>
                        </div>
                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] text-gray-400 mt-0.5">
                          Official PPF Warranty Passport
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Contactless Symbol */}
                        <div className="text-gray-400 flex flex-col items-center">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M8.5 16.5a5 5 0 0 1 0-7" />
                            <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                            <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                          </svg>
                        </div>

                        {/* Security Hologram Seal */}
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-accent/30 via-emerald-400/20 to-accent/40 border border-accent/60 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,174,239,0.4)]">
                          <ShieldCheck size={18} className="text-accent" />
                          <span className="text-[6px] font-black tracking-widest text-white uppercase mt-0.5">VERIFIED</span>
                        </div>
                      </div>
                    </div>

                    {/* Chip & Status */}
                    <div className="relative z-10 flex items-center justify-between my-auto">
                      {/* Golden Metallic EMV Chip */}
                      <div className="w-12 h-9 sm:w-14 sm:h-10 rounded-lg bg-gradient-to-br from-[#ffd977] via-[#cba135] to-[#8c6b16] border border-[#ffec99] shadow-md p-1.5 flex flex-col justify-between relative overflow-hidden">
                        <div className="w-full h-px bg-black/40" />
                        <div className="w-full h-px bg-black/40" />
                        <div className="w-full h-px bg-black/40" />
                      </div>

                      {/* Active Status Badge */}
                      <div className={`px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${
                        timeDetails.isExpired
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-emerald-500/15 border-emerald-400/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${timeDetails.isExpired ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
                        <span>{timeDetails.isExpired ? 'EXPIRED' : 'ACTIVE & PROTECTED'}</span>
                      </div>
                    </div>

                    {/* Center: Embossed Serial Code */}
                    <div className="relative z-10">
                      <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-accent/80 mb-1">
                        Official Serial Identification
                      </p>
                      <div className="text-lg sm:text-2xl md:text-3xl font-mono font-black tracking-[0.18em] sm:tracking-[0.24em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {warrantyData.warrantyNumber}
                      </div>
                    </div>

                    {/* Bottom: Vehicle, Client, Tier, Dates */}
                    <div className="relative z-10 pt-3 border-t border-white/10 flex items-end justify-between gap-4 text-left">
                      <div className="space-y-0.5">
                        <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-gray-500">
                          Protected Vehicle
                        </p>
                        <p className="text-sm sm:text-base font-black text-white uppercase tracking-tight truncate max-w-[160px] sm:max-w-[240px]">
                          {warrantyData.carName}
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 truncate">
                          {warrantyData.customerName}
                        </p>
                      </div>

                      <div className="space-y-0.5 text-right">
                        <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-accent">
                          Coverage Tier
                        </p>
                        <p className="text-xs sm:text-sm font-black text-accent uppercase tracking-wider">
                          {warrantyData.productVariant} ({warrantyData.warrantyYears} Yrs)
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-mono font-bold text-gray-400">
                          Valid Thru: {timeDetails.expiryFormatted}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Realtime Countdown Ticker (If Active) */}
                {!timeDetails.isExpired ? (
                  <div className="bg-black/60 border border-accent/30 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl relative overflow-hidden">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                      <div>
                        <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em] mb-1">
                          <Clock size={16} className="animate-spin text-accent" style={{ animationDuration: '8s' }} />
                          <span>Realtime Warranty Clock</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          Coverage Time Remaining
                        </h3>
                      </div>

                      <div className="text-xs text-gray-400 font-mono">
                        Coverage Expires: <span className="text-accent font-bold">{timeDetails.expiryFormatted}</span>
                      </div>
                    </div>

                    {/* Countdown Digits Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4 mb-6">
                      {[
                        { label: 'Years', val: timeDetails.yearsRemaining },
                        { label: 'Days', val: timeDetails.daysRemaining },
                        { label: 'Hours', val: String(timeDetails.hoursRemaining).padStart(2, '0') },
                        { label: 'Mins', val: String(timeDetails.minutesRemaining).padStart(2, '0') },
                        { label: 'Secs', val: String(timeDetails.secondsRemaining).padStart(2, '0'), highlight: true },
                        { label: 'Status', val: `${timeDetails.percentRemaining}%`, sub: 'Remaining' }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3 md:p-4 rounded-xl text-center border backdrop-blur-md transition-all ${
                            item.highlight
                              ? 'bg-accent/15 border-accent/50 text-accent shadow-[0_0_15px_rgba(0,174,239,0.2)]'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        >
                          <div className="text-2xl md:text-3xl font-black font-mono tracking-tight mb-1">
                            {item.val}
                          </div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-accent to-emerald-400 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${timeDetails.percentRemaining}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8 text-center">
                    <p className="text-red-300 font-bold uppercase tracking-wider text-sm">
                      This warranty coverage expired on {timeDetails.expiryFormatted}.
                    </p>
                  </div>
                )}

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  {/* Warranty Number & Customer */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                    <div className="text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      Warranty Identification
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-lg md:text-xl font-mono font-black text-accent tracking-wider">
                        {warrantyData.warrantyNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(warrantyData.warrantyNumber)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer print:hidden"
                        title="Copy code"
                      >
                        {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                      </button>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Coverage Type:</span>
                        <span className="font-bold text-white">
                          {warrantyData.coverageType || 'Paint Protection Film'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Client / Account:</span>
                        <span className="font-bold text-white">
                          {warrantyData.customerName || 'Registered Owner'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      <Car size={16} className="text-accent" />
                      <span>Protected Vehicle</span>
                    </div>
                    <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4">
                      {warrantyData.carName}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Film Variant:</span>
                        <span className="font-black text-accent bg-accent/10 px-2.5 py-0.5 rounded border border-accent/20 uppercase tracking-wider text-xs">
                          {warrantyData.productVariant} Series
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Warranty Term:</span>
                        <span className="font-bold text-white">
                          {warrantyData.warrantyYears || 5} Years Official Guarantee
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Studio Details */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      <MapPin size={16} className="text-accent" />
                      <span>Certified Installation Studio</span>
                    </div>
                    <div className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-2">
                      {warrantyData.studioName}
                    </div>
                    {warrantyData.studioLocation && (
                      <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                        {warrantyData.studioLocation}
                      </p>
                    )}
                    {warrantyData.contact && (
                      <div className="flex items-center gap-2 text-xs text-accent font-semibold pt-2 border-t border-white/5">
                        <Phone size={14} />
                        <span>{warrantyData.contact}</span>
                      </div>
                    )}
                  </div>

                  {/* Installation & Expiry Dates */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-widest text-gray-500 mb-2">
                      <Calendar size={16} className="text-accent" />
                      <span>Timeline Verification</span>
                    </div>

                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Installation Date:</span>
                        <span className="font-mono font-bold text-white">
                          {timeDetails.installFormatted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Valid Through:</span>
                        <span className="font-mono font-bold text-accent">
                          {timeDetails.expiryFormatted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                        <span className="text-gray-400">Total Days Remaining:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {timeDetails.totalDaysRemaining || 0} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Security Notice */}
                <div className="pt-6 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>Cryptographically Verified Serial Code on Starkx Global Ledger</span>
                  </div>
                  <div className="font-mono text-[11px]">
                    starkx.pro • Official Authentication
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default UserWarrantyCheck;