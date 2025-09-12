import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const fallbackIcon = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
    <circle cx="40" cy="40" r="38" stroke="#a855f7" strokeWidth="4" fill="#f3f4f6" />
    <path d="M20 60V50L40 35L60 50V60" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="32" y="45" width="16" height="15" rx="3" fill="#a855f7" />
  </svg>
);

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/getSchools')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setLoading(false);
      });
  }, []);

  // Accessibility: trap focus and close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  // Overlay click to close
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') setModalOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center flex-1 uppercase tracking-wide font-inter drop-shadow-lg">All Schools</h2>
        <a href="/" className="mt-6 md:mt-0 ml-0 md:ml-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-purple-500 glow-btn">Back</a>
      </div>
      {loading ? (
        <div className="text-white text-center text-xl font-poppins">Loading...</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center max-w-7xl mx-auto">
          {Array.isArray(schools) && schools.length > 0 ? (
            schools.map((school) => (
              <motion.div
                key={school.id}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #a855f7" }}
                className="bg-gradient-to-br from-[#18181b] via-[#23234a] to-[#1e293b] rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-gray-700 transition-transform duration-300 ease-in-out card-premium"
              >
                {school.image ? (
                  <img src={`/schoolImages/${school.image}`} alt={school.name} className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-purple-500 shadow-lg bg-white" />
                ) : fallbackIcon}
                <h3 className="text-2xl font-bold mb-2 text-white text-center font-poppins drop-shadow">{school.name}</h3>
                <div className="text-white/80 text-base mb-1 font-poppins text-center">
                  <span className="block">Address: <span className="font-medium text-white/90">{school.address}</span></span>
                  <span className="block">City: <span className="font-medium text-white/90">{school.city}</span></span>
                  <span className="block">State: <span className="font-medium text-white/90">{school.state}</span></span>
                  <span className="block">Pincode: <span className="font-medium text-white/90">{school.pincode}</span></span>
                  <span className="block">Contact: <span className="font-medium text-white/90">{school.number}</span></span>
                  <span className="block">Email: <span className="font-medium text-white/90">{school.email}</span></span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 0 24px 4px #50C878" }}
                  className="mt-6 px-8 py-3 rounded-2xl bg-[#50C878] font-bold shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#50C878] glow-btn z-10 !text-white"
                  onClick={() => { setSelectedSchool(school); setModalOpen(true); }}
                >
                  Detail
                </motion.button>
              </motion.div>
            ))
          ) : (
            <div className="text-white text-center text-lg font-poppins">No schools found or unable to fetch data.</div>
          )}
        </div>
      )}
      <AnimatePresence>
        {modalOpen && selectedSchool && (
          <motion.div
            id="modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            style={{ backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-black rounded-xl p-8 max-w-xl w-[90%] shadow-[0_0_32px_4px_#50C878] relative flex flex-col items-center z-50"
              style={{ boxShadow: "0 0 32px 4px #50C878" }}
              tabIndex={0}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#50C878] text-center font-inter">{selectedSchool.name}</h2>
              {selectedSchool.image ? (
                <img src={`/schoolImages/${selectedSchool.image}`} alt={selectedSchool.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-900 rounded-lg mb-4">{fallbackIcon}</div>
              )}
              <div className="text-white text-base mb-6 font-poppins w-full">
                <div className="mb-2"><span className="font-semibold text-[#50C878]">Address:</span> {selectedSchool.address}</div>
                <div className="mb-2"><span className="font-semibold text-[#50C878]">City:</span> {selectedSchool.city}</div>
                <div className="mb-2"><span className="font-semibold text-[#50C878]">State:</span> {selectedSchool.state}</div>
                <div className="mb-2"><span className="font-semibold text-[#50C878]">Pincode:</span> {selectedSchool.pincode}</div>
                <div className="mb-2"><span className="font-semibold text-[#50C878]">Contact:</span> {selectedSchool.number}</div>
                <div className="mb-2"><span className="font-semibold text-[#50C878]">Email:</span> {selectedSchool.email}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#3DAA63" }}
                className="mx-auto px-6 py-2 bg-[#50C878] text-black font-semibold rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#50C878]"
                onClick={() => setModalOpen(false)}
                autoFocus
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}