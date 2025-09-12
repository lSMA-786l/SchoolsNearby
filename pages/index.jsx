import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col justify-center items-center grain-bg">
      <section className="w-full max-w-3xl mx-auto py-24 px-6 text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="uppercase font-extrabold text-white text-5xl md:text-6xl tracking-wide mb-6 drop-shadow-lg font-inter"
        >
          Academy-Level Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="text-white/80 text-xl md:text-2xl font-poppins mb-10 leading-relaxed"
        >
          Add, find, and showcase schools with a refined, fast interface.
        </motion.p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <motion.a
            href="/addSchool"
            whileHover={{ scale: 1.07, boxShadow: "0 0 24px 4px #a855f7" }}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white text-2xl font-bold shadow-lg font-inter transition-all duration-300 focus-visible:ring-2 focus-visible:ring-purple-500 glow-btn"
          >
            Add School
          </motion.a>
          <motion.a
            href="/showSchools"
            whileHover={{ scale: 1.07, boxShadow: "0 0 24px 4px #06b6d4" }}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white text-2xl font-bold shadow-lg font-inter transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 glow-btn"
          >
            View Schools
          </motion.a>
        </div>
      </section>
    </main>
  );
}