import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Server,
  Smartphone,
  Activity,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Briefcase,
  Wrench,
  Lightbulb,
  Menu,
  X,
  PlayCircle,
  BarChart3,
  BellRing,
  CheckCircle2,
  TrendingDown,
  Code2
} from 'lucide-react';

const THEME_STORAGE_KEY = 'errnor-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark') return 'dark';
    if (stored === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

const squad = [
  {
    id: 'nabil',
    name: 'Nabil Aulia Dika',
    role: 'The Hustler',
    position: 'CEO & Product Strategist',
    icon: <Lightbulb size={28} className="text-blue-500" />,
    color: 'blue',
    expertise:
      'Visioner, lincah memetakan alur bisnis, dan fokus pada kelayakan pasar (Market-Product Fit).',
    skills: [
      { name: 'Business Model Canvas (BMC)', level: 90 },
      { name: 'Pitching & Storytelling', level: 85 },
      { name: 'Wireframing & UX Flow', level: 80 },
    ],
    tools: ['Figma', 'Notion', 'Google Slides'],
    bgImg: '/nabil.jpg',
  },
  {
    id: 'arienal',
    name: 'Arienal Zaky Irvan',
    role: 'The Brain',
    position: 'AI Engineer & Tech Writer',
    icon: <BrainCircuit size={28} className="text-emerald-500" />,
    color: 'emerald',
    expertise:
      'Menerjemahkan probabilitas menjadi algoritma pasti. Fokus pada RAG dan optimasi portofolio dasar.',
    skills: [
      { name: 'Prompt Engineering (LLM)', level: 88 },
      { name: 'Technical Documentation', level: 85 },
      { name: 'Algoritma Mean-Variance', level: 75 },
    ],
    tools: ['Python', 'pgvector', 'LangChain API'],
    bgImg: '/arienal.jpg',
  },
  {
    id: 'jawzy',
    name: 'Ibnul Jawzy',
    role: 'The Engine',
    position: 'Backend & Cloud Architect',
    icon: <Server size={28} className="text-indigo-500" />,
    color: 'indigo',
    expertise:
      'Membangun tulang punggung server yang efisien. Haus belajar standar arsitektur perbankan.',
    skills: [
      { name: 'RESTful API Development', level: 85 },
      { name: 'Database Management (SQL)', level: 80 },
      { name: 'Mock-up API SNAP BI', level: 70 },
    ],
    tools: ['FastAPI', 'Docker', 'GCP (Cloud Run)'],
    bgImg: '/jawzy.jpg',
  },
  {
    id: 'rizki',
    name: 'Muhammad Rizki',
    role: 'The Face',
    position: 'Frontend & Mobile Dev',
    icon: <Smartphone size={28} className="text-cyan-500" />,
    color: 'cyan',
    expertise: 'Mengubah data mentah menjadi UI yang fluid dan interaktif di layar smartphone.',
    skills: [
      { name: 'Cross-Platform (Flutter)', level: 85 },
      { name: 'State Management', level: 80 },
      { name: 'Financial DataViz (Fl_Chart)', level: 75 },
    ],
    tools: ['Dart', 'VS Code', 'Postman'],
    bgImg: '/rizki.jpg',
  },
];

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [income, setIncome] = useState(15);
  const [debt, setDebt] = useState(5);
  const [isOptimized, setIsOptimized] = useState(false);
  const [nudgeExecuted, setNudgeExecuted] = useState(false);

  // SPLASH SCREEN STATE ('visible', 'leaving', 'hidden')
  const [splashState, setSplashState] = useState('visible');

  // SPLASH SCREEN LOGIC & BROWSER TITLE
  useEffect(() => {
    document.title = "LUNAS by ERRNOR - Hackathon 2026";
    
    // Timer 1: Mulai animasi geser garasi ke atas di detik 2.5
    const slideTimer = setTimeout(() => setSplashState('leaving'), 2500);
    // Timer 2: Hapus dari DOM sepenuhnya di detik 3.3 (biar gak halangin klik)
    const hideTimer = setTimeout(() => setSplashState('hidden'), 3300);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore quota */
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (selectedMember) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % squad.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [selectedMember]);

  const nextMember = () => setActiveIdx((prev) => (prev + 1) % squad.length);
  const prevMember = () => setActiveIdx((prev) => (prev - 1 + squad.length) % squad.length);

  const getCardPosition = (index) => {
    const diff = index - activeIdx;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -3) return 'right';
    if (diff === -1 || diff === 3) return 'left';
    return 'hidden';
  };

  const surplus = Math.max(0, income - debt);
  const invested = surplus * 0.5;
  const asset12Months = invested * 12 * 1.08;

  return (
    <>
      {/* ================= LOADING SPLASH SCREEN (GARAGE DOOR EFFECT) ================= */}
      {splashState !== 'hidden' && (
        <div 
          className={`fixed inset-0 z-[9999] bg-[#050810] flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${splashState === 'leaving' ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <div className="flex flex-col items-center justify-center gap-6 relative">
            {/* Glowing Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 rounded-full animate-pulse"></div>
              <BrainCircuit size={64} className="text-cyan-400 relative z-10 animate-bounce" />
            </div>
            
            {/* Typography */}
            <div className="text-center space-y-2 overflow-hidden">
              <h1 className="text-2xl md:text-4xl font-black text-slate-100 tracking-[0.2em] uppercase animate-[fade-in-up_0.8s_ease-out]">
                Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Logic</span>
              </h1>
              <h2 className="text-lg md:text-xl font-bold text-slate-400 tracking-[0.3em] uppercase animate-[fade-in-up_1.2s_ease-out]">
                Delivered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">AI.</span>
              </h2>
            </div>
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-[progress_2s_ease-in-out_forwards]"></div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}} />
        </div>
      )}
      {/* ================= END OF SPLASH SCREEN ================= */}

      <div className="bg-slate-50 dark:bg-[#080C16] text-slate-900 dark:text-slate-100 min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500">
        {/* NAVBAR */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/80 dark:bg-[#080C16]/80 backdrop-blur-lg shadow-sm border-b border-slate-200 dark:border-white/10' : 'py-5 bg-transparent'}`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-10">
              <div
                onClick={() => scrollTo('hero')}
                className="flex items-center gap-3 font-black tracking-tighter text-xl cursor-pointer"
              >
                <img src="/logo-icon.png" alt="ERRNOR" className="h-8 w-8 object-contain" />
                <span>ERRNOR.</span>
              </div>
              <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
                <button
                  onClick={() => scrollTo('product')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  How it Works
                </button>
                <button
                  onClick={() => scrollTo('playground')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Interactive Demo
                </button>
                <button
                  onClick={() => scrollTo('team')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  The Squad
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="md:hidden p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-110 transition-transform shadow-sm"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-110 transition-transform shadow-sm"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/20 dark:bg-emerald-600/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_reverse]" />

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-bold mb-8 uppercase tracking-widest border border-slate-300 dark:border-slate-700 backdrop-blur-sm">
              <Briefcase size={16} /> Portofolio Inovasi - Team ERRNOR
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2 text-slate-900 dark:text-white drop-shadow-sm">
              LUNAS
            </h1>
            
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 mb-6 tracking-wide uppercase">
              Layanan Utang & Navigasi Aset Sistematis
            </h2>

            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
              Automasi Efisiensi Liabilitas & Behavioral Nudging <br className="hidden md:block" />{' '}
              Berbasis SNAP BI untuk Akselerasi Investor Ritel.
            </p>

            {/* VIBE CODING TEAM BADGE */}
            <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 dark:from-indigo-500/20 dark:to-emerald-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-black text-sm md:text-base tracking-[0.2em] uppercase mb-10 shadow-lg shadow-indigo-500/5 backdrop-blur-md hover:scale-105 transition-transform cursor-default">
              <Code2 size={20} className="text-indigo-500 dark:text-indigo-400" />
              Powered by Logic, Delivered by AI.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollTo('product')}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle size={20} /> Discover Product
              </button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="product"
          className="py-24 bg-white dark:bg-[#0A0F1C] border-y border-slate-100 dark:border-slate-800/50 relative z-10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                How <span className="text-blue-600 dark:text-blue-400">LUNAS</span> Works
              </h2>
            </div>
            <div className="space-y-32">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs mb-4">
                    <TrendingDown size={16} /> The Problem
                  </div>
                  <h3 className="text-3xl font-black mb-4">
                    Beban Utang <br />
                    vs<br /> Potensi Aset
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Arus kas generasi muda sering tercekik cicilan berbunga tinggi. Tanpa intervensi,
                    potensi pertumbuhan aset menjadi stagnan atau bahkan minus.
                  </p>
                  <button
                    onClick={() => setIsOptimized(!isOptimized)}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isOptimized ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20'}`}
                  >
                    {isOptimized ? (
                      <>
                        <CheckCircle2 size={18} /> Efisiensi Aktif
                      </>
                    ) : (
                      <>
                        <Activity size={18} /> Aktifkan Efisiensi Liabilitas
                      </>
                    )}
                  </button>
                </div>
                <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative h-80 flex items-end justify-around pb-12 shadow-inner">
                  <div className="relative w-1/3 flex flex-col items-center justify-end h-full">
                    <span className="absolute -top-8 text-sm font-bold text-slate-500 dark:text-slate-400">
                      Beban Bunga
                    </span>
                    <div
                      className="w-full bg-red-500 rounded-t-xl transition-all duration-1000 relative flex items-start justify-center pt-2"
                      style={{ height: isOptimized ? '25%' : '85%' }}
                    >
                      <span className="text-white/80 font-bold text-xs">
                        {isOptimized ? '25%' : '85%'}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-1/3 flex flex-col items-center justify-end h-full">
                    <span className="absolute -top-8 text-sm font-bold text-slate-500 dark:text-slate-400">
                      Potensi Return
                    </span>
                    <div
                      className="w-full bg-emerald-500 rounded-t-xl transition-all duration-1000 relative flex items-start justify-center pt-2"
                      style={{ height: isOptimized ? '75%' : '15%' }}
                    >
                      <span className="text-white/80 font-bold text-xs">
                        {isOptimized ? '75%' : '15%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                    <BrainCircuit size={16} /> Behavioral Nudging
                  </div>
                  <h3 className="text-3xl font-black mb-4">
                    The AI <br />
                    Interception
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Sistem mendeteksi saat user baru menerima gaji. Alih-alih pop-up promosi
                    konsumtif, AI memberikan <i>nudge</i> psikologis untuk mengalihkan dana secara
                    pintar.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-80 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl p-4 overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900" />
                    <div
                      className={`relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl transform transition-all duration-500 ${nudgeExecuted ? 'scale-95 opacity-50' : 'hover:scale-105 shadow-2xl shadow-blue-500/20'}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-amber-500 text-white p-1.5 rounded-full animate-bounce">
                          <BellRing size={16} />
                        </div>
                        <span className="text-xs font-bold text-slate-200">Gaji Masuk Terdeteksi!</span>
                      </div>
                      <p className="text-sm text-white font-medium mb-4 leading-relaxed">
                        <span className="text-red-400">Peringatan:</span> Bunga Paylater-mu (30%)
                        memakan arus kas.
                      </p>
                      <div className="bg-black/30 p-3 rounded-lg mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-red-400">Lunasi Paylater:</span>{' '}
                          <span className="text-white font-bold">Rp500k</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-400">Invest:</span>{' '}
                          <span className="text-white font-bold">Rp100k</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setNudgeExecuted(true)}
                        className={`w-full py-2.5 rounded-lg font-bold text-sm transition-colors ${nudgeExecuted ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                      >
                        {nudgeExecuted ? 'Eksekusi Berhasil ✓' : 'Ketuk untuk Eksekusi'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLAYGROUND */}
        <section id="playground" className="py-24 px-6 max-w-5xl mx-auto relative z-10">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-white border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <h3 className="text-2xl font-black mb-2">Interactive Demo</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="flex justify-between text-sm font-bold mb-3 text-slate-300">
                      <span>Pendapatan</span>
                      <span className="text-white">Rp {income} Juta</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-bold mb-3 text-slate-300">
                      <span>Utang</span>
                      <span className="text-red-400">Rp {debt} Juta</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={debt}
                      onChange={(e) => setDebt(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-6">
                  <Activity size={16} /> AI Projection (12 Months)
                </div>
                {surplus <= 0 ? (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm text-center font-bold">
                    Defisit Finansial.
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Aset via Nudging Auto-Sweep</div>
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm">
                        Rp {asset12Months.toFixed(1)} Juta
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section
          id="team"
          className="py-24 px-4 overflow-hidden bg-white dark:bg-[#080C16] border-t border-slate-100 dark:border-white/10 relative z-10"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              The <span className="text-blue-600 dark:text-blue-400">Masterminds</span>
            </h2>
          </div>

          <div className="relative w-full max-w-6xl mx-auto h-[450px] flex items-center justify-center">
            {squad.map((member, idx) => {
              const pos = getCardPosition(idx);
              let zIndex = 10;
              let transform = 'scale(0.8) translateX(0) opacity-0';

              if (pos === 'center') {
                zIndex = 30;
                transform = 'scale(1) translateX(0) opacity-100';
              } else if (pos === 'left') {
                zIndex = 20;
                transform = 'scale(0.85) translateX(-65%) opacity-60';
              } else if (pos === 'right') {
                zIndex = 20;
                transform = 'scale(0.85) translateX(65%) opacity-60';
              }

              const filterClass = pos === 'center' ? 'grayscale-0 blur-0' : 'grayscale blur-md';

              return (
                <div
                  key={member.id}
                  onClick={() => {
                    if (pos === 'left') prevMember();
                    else if (pos === 'right') nextMember();
                    else setSelectedMember(member);
                  }}
                  className={`absolute w-[280px] md:w-[350px] h-[400px] rounded-3xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 ${filterClass}`}
                  style={{ zIndex, transform }}
                >
                  <img
                    src={member.bgImg}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                  <div className="absolute bottom-0 w-full p-6 text-white text-center">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                      {member.role}
                    </div>
                    <h3 className="text-2xl font-black mb-1 drop-shadow-md">{member.name}</h3>
                    <div
                      className={`mt-4 transition-opacity duration-300 ${pos === 'center' ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <span className="text-xs border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-md hover:bg-white hover:text-black transition-colors">
                        Lihat Detail
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={prevMember}
              className="absolute left-4 md:left-12 z-40 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:scale-110 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={nextMember}
              className="absolute right-4 md:right-12 z-40 p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:scale-110 hover:bg-blue-600 hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* TEAM MEMBER MODAL */}
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setSelectedMember(null)}
            />

            <div className="relative w-full max-w-4xl bg-white dark:bg-[#0A0F1C] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform animate-in fade-in zoom-in duration-300 border border-slate-200 dark:border-slate-800 max-h-[90vh]">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-800 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-full overflow-hidden bg-slate-100 dark:bg-[#050810]">
                <img
                  src={selectedMember.bgImg}
                  alt={selectedMember.name}
                  className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1 drop-shadow-md">
                    {selectedMember.role}
                  </div>
                  <h3 className="text-3xl font-black mb-1 drop-shadow-md">{selectedMember.name}</h3>
                  <div className="text-sm text-slate-200 drop-shadow-md">{selectedMember.position}</div>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto">
                <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-3 text-slate-900 dark:text-white">
                    <Briefcase size={18} className="text-blue-500" /> Profil Spesialisasi
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                    "{selectedMember.expertise}"
                  </p>
                </div>
                <div className="mb-8">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-slate-900 dark:text-white">
                    <BarChart3 size={18} className="text-emerald-500" /> Proficiency Status
                  </h4>
                  <div className="space-y-4">
                    {selectedMember.skills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                          <span>{skill.name}</span>
                          <span className="text-blue-600 dark:text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-slate-900 dark:text-white">
                    <Wrench size={18} className="text-amber-500" /> Tech Stack & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800/50 text-center bg-white dark:bg-[#080C16] relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 font-black tracking-tighter text-lg text-slate-900 dark:text-white">
              <img src="/logo-errnor.png" alt="ERRNOR" className="h-6 w-auto object-contain" />
              <span>ERRNOR.</span>
            </div>
            <p className="text-sm font-medium text-slate-500">© 2026 Team ERRNOR. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-bold tracking-widest uppercase ml-1">Powered by Logic, Delivered by AI.</span></p>
          </div>
        </footer>
      </div>
    </>
  );
}