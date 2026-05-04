import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Eye, Database, Share2, ShieldAlert, UserCheck,
  Mail, X, Phone, Fingerprint, CheckCircle2, ChevronRight
} from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Data Collection Architecture",
      icon: <Database className="text-accent" size={24} />,
      content:
        "We collect information through various touchpoints: direct interactions (account creation, forms), automated technologies (cookies, server logs), and third-party sources. This includes Identity Data (name, username), Contact Data (email, address), Technical Data (IP address, browser type), and Usage Data (how you interact with our site)."
    },
    {
      title: "2. Strategic Data Utilization",
      icon: <Eye className="text-accent" size={24} />,
      content:
        "Your data is used to provide and maintain our services, notify you about changes, allow you to participate in interactive features, provide customer support, and gather analysis to improve our offerings. We process your personal data only when we have a lawful basis to do so."
    },
    {
      title: "3. Cookie & Tracking Ecosystem",
      icon: <ShieldAlert className="text-accent" size={24} />,
      content:
        "Cookies help us remember your preferences and understand how you use our site. You can disable cookies in your browser, but some features may not work properly."
    },
    {
      title: "4. Third-Party Data Integrity",
      icon: <Share2 className="text-accent" size={24} />,
      content:
        "We do not sell your personal data. We may share it with trusted third-party providers under strict confidentiality agreements."
    },
    {
      title: "5. Global Compliance (GDPR & CCPA)",
      icon: <UserCheck className="text-accent" size={24} />,
      content:
        "We support global data rights including access, correction, deletion, and portability where applicable."
    },
    {
      title: "6. Advanced Security Protocols",
      icon: <Lock className="text-accent" size={24} />,
      content:
        "We use encryption, authentication systems, and regular audits to protect your data."
    }
  ];

  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const [supportFormData, setSupportFormData] = React.useState({
    email: '',
    phone: '',
    userId: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setShowError(true);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setIsSupportModalOpen(false);
    setIsSuccessModalOpen(true);
    setSupportFormData({ email: '', phone: '', userId: '' });
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white pb-32">

      <section className="px-4 md:px-8 max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase italic">
            Privacy <span className="text-accent underline">Policy</span>
          </h1>
        </motion.div>

        {/* Sections */}
        <div className="grid gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="flex gap-6">
                <div className="w-14 h-14 flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                  <p className="text-gray-400">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-20 text-center">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl mr-4"
          >
            Download Data
          </button>

          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl"
          >
            Delete Account
          </button>
        </div>
      </section>

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">

          <div
            className="absolute inset-0"
            onClick={() => {
              setIsLoginOpen(false);
              setShowError(false);
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] p-8 rounded-2xl w-[400px] relative"
          >
            <h2 className="text-xl font-bold mb-6">Secure Login</h2>

            <form onSubmit={handleLogin} className="space-y-4">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-black border border-white/20 rounded"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black border border-white/20 rounded"
              />

              {showError && (
                <div className="text-red-500 text-sm">
                  Invalid credentials
                  <button
                    type="button"
                    onClick={() => setIsSupportModalOpen(true)}
                    className="block mt-2 text-white underline"
                  >
                    Contact Support
                  </button>
                </div>
              )}

              <button className="w-full bg-white text-black py-3 rounded">
                Login
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* SUPPORT MODAL */}
      <AnimatePresence>
        {isSupportModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#111] p-8 rounded-2xl w-[400px]"
            >
              <h2 className="text-xl mb-4">Support Request</h2>

              <form onSubmit={handleSupportSubmit} className="space-y-3">

                <input
                  placeholder="Email"
                  value={supportFormData.email}
                  onChange={(e) =>
                    setSupportFormData({ ...supportFormData, email: e.target.value })
                  }
                  className="w-full p-3 bg-black border rounded"
                />

                <input
                  placeholder="Phone"
                  value={supportFormData.phone}
                  onChange={(e) =>
                    setSupportFormData({ ...supportFormData, phone: e.target.value })
                  }
                  className="w-full p-3 bg-black border rounded"
                />

                <input
                  placeholder="User ID"
                  value={supportFormData.userId}
                  onChange={(e) =>
                    setSupportFormData({ ...supportFormData, userId: e.target.value })
                  }
                  className="w-full p-3 bg-black border rounded"
                />

                <button className="w-full bg-white text-black py-3 rounded">
                  Send Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
          <div className="bg-[#111] p-8 rounded-2xl text-center">
            <CheckCircle2 className="mx-auto mb-4 text-green-400" />
            <h2 className="text-xl font-bold">Request Sent</h2>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-4 px-4 py-2 bg-white text-black rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;