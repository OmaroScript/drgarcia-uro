"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, Star, Award, Activity,
  Zap, Shield, Scissors, Droplets, Heart, AlertCircle, Cpu,
  Stethoscope, Menu, X, VolumeX, Volume2, Play, Pause, Microscope,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── constants ─── */
const WA    = "https://wa.me/526644605376?text=Hola%2C%20quisiera%20agendar%20una%20consulta%20con%20el%20Dr.%20Arrieta";
const PHONE = "664-460-5376";
const EMAIL = "centroavanzadodeurologia@gmail.com";
const LOGO  = "https://centrourologicotijuana.com/wp-content/uploads/2025/11/drarturogarcia_logo.png";
const DOCTOR_PHOTO = "https://centrourologicotijuana.com/wp-content/uploads/2025/12/A7407610.webp";
const VIDEO_PROMO  = "https://centrourologicotijuana.com/wp-content/uploads/2026/02/promo-laser.webm";
const VIDEO_HOLEP  = "https://centrourologicotijuana.com/wp-content/uploads/2026/01/holep.mp4";

const MARQUEE_ITEMS = [
  "Certificado CNMU", "HoLEP", "ThuFLEP", "Cirugía Robótica",
  "425+ Reseñas Verificadas", "80K Seguidores", "Urgencias 24/7",
  "Cálculos Renales Láser", "Cáncer de Próstata",
  "Cirugía Mínimamente Invasiva", "Tijuana, BC",
];

const SERVICES = [
  { Icon: Zap,         title: "HoLEP",                desc: "Enucleación prostática con láser Holmio. El estándar de oro mundial." },
  { Icon: Zap,         title: "ThuFLEP",               desc: "Láser Tulio para resección prostática con hemostasia superior." },
  { Icon: Activity,    title: "Hiperplasia Prostática", desc: "Tratamiento integral BPH con técnicas mínimamente invasivas." },
  { Icon: Droplets,    title: "Cálculos Renales",      desc: "Litotricia láser intracorpórea sin cirugía abierta." },
  { Icon: Scissors,    title: "Fimosis / Circuncisión",desc: "Circuncisión láser de alta precisión con recuperación rápida." },
  { Icon: Shield,      title: "HPV",                   desc: "Diagnóstico, tratamiento y seguimiento integral del VPH." },
  { Icon: Heart,       title: "Varicocele",             desc: "Corrección venosa para mejorar fertilidad y eliminar dolor." },
  { Icon: Scissors,    title: "Vasectomía",             desc: "Anticoncepción masculina definitiva, segura y ambulatoria." },
  { Icon: AlertCircle, title: "Cáncer Testicular",     desc: "Detección temprana y manejo oncológico especializado." },
  { Icon: AlertCircle, title: "Cáncer Renal",          desc: "Nefrectomía parcial y radical con técnica avanzada." },
  { Icon: AlertCircle, title: "Cáncer de Próstata",    desc: "Diagnóstico, estadificación y tratamiento integral." },
  { Icon: Shield,      title: "Cáncer Urológico",      desc: "Oncología urológica multidisciplinaria de vejiga y uréter." },
  { Icon: Cpu,         title: "Cirugía Robótica",      desc: "Máxima precisión con sistema robótico de última generación." },
  { Icon: Activity,    title: "Laparoscopia",           desc: "Procedimientos laparoscópicos con recuperación acelerada." },
  { Icon: Stethoscope, title: "Endourología",           desc: "Diagnóstico endoscópico del tracto urinario superior e inferior." },
  { Icon: Droplets,    title: "Infecciones Urinarias",  desc: "Tratamiento preciso de ITU recurrentes del tracto urinario." },
];

const PROCEDURE_VIDEOS = [
  { src: VIDEO_PROMO, tag: "Láser Urológico", title: "Cirugía con Láser",  desc: "Tecnología de vanguardia para procedimientos prostáticos." },
  { src: VIDEO_HOLEP, tag: "HoLEP",           title: "Enucleación HoLEP", desc: "El estándar de oro para hiperplasia prostática benigna."  },
];

const TESTIMONIALS = [
  { quote: "Excelente doctor, muy profesional y amable. Te hace sentir confianza desde el primer momento.", author: "Rene Sosa",          src: "Google" },
  { quote: "Todo muy profesional y el trato también. Lo recomiendo ampliamente sin dudarlo.",               author: "Kevin Cárdenas",     src: "Doctoralia" },
  { quote: "El Dr. Arrieta mostró gran profesionalismo y calidad humana en todo momento.",                  author: "Marcelo Valerio",    src: "Google" },
  { quote: "Excelente lugar para consultar. Instalaciones modernas y atención de primer nivel.",            author: "Ludmila Palafox",    src: "Doctoralia" },
  { quote: "Muy contentos con el procedimiento y los resultados. ¡100% recomendado!",                      author: "Guillermina Mariscal",src: "Google" },
  { quote: "Me dio mucha confianza desde la primera consulta. Explicó todo con claridad y paciencia.",     author: "Carlos Medina",      src: "Google" },
  { quote: "Operación sin complicaciones y recuperación rapidísima. El mejor urólogo de Tijuana.",         author: "Andrés Fuentes",     src: "Doctoralia" },
  { quote: "Profesionalismo de alto nivel. Las instalaciones son modernas y el personal muy amable.",      author: "Patricia Ruiz",      src: "Google" },
];

/* diferenciadores — sin números decorativos */
const WHY_US = [
  {
    Icon: Zap,
    title: "Tecnología de Punta",
    stat: "Láser HoLEP",
    desc: "Únicos en la región fronteriza con láser Holmio certificado para HoLEP y ThuFLEP. Equipos de última generación en cada procedimiento.",
    tags: ["HoLEP", "ThuFLEP", "Cirugía Robótica"],
  },
  {
    Icon: Award,
    title: "Certificación Nacional",
    stat: "CNMU Cert.",
    desc: "Avalado por el Consejo Nacional Mexicano de Urología. Formación continua en instituciones internacionales de referencia.",
    tags: ["CNMU", "Cédula Profesional", "Especialidad"],
  },
  {
    Icon: Star,
    title: "Resultados Comprobados",
    stat: "425+ Reseñas",
    desc: "Confianza respaldada por cientos de pacientes de México y EE.UU. con calificación perfecta en todas las plataformas.",
    tags: ["Google 5★", "Doctoralia", "80K Seguidores"],
  },
];

const HOSPITALS = [
  "Hospital MAC Tijuana",
  "Hospital Ángeles Tijuana",
  "Hospital del Prado",
  "NewCity Medical Plaza",
];

/* ─── hooks ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in-view"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useVideoScroll(threshold = 0.45) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? v.play().catch(() => {}) : v.pause(); },
      { threshold }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── main ─── */
export default function LandingPage() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formMsg,   setFormMsg]   = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* GSAP hero entrance */
  useEffect(() => {
    let ctx: { revert?: () => void } = {};
    import("gsap").then(({ gsap }) => {
      ctx = gsap.context(() => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-badge",       { opacity: 0, y: 24, duration: 0.6 })
          .from(".hero-line",        { opacity: 0, y: 48, stagger: 0.13, duration: 0.75 }, "-=0.25")
          .from(".hero-name",        { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
          .from(".hero-divider",     { scaleX: 0, duration: 0.45, transformOrigin: "left" }, "-=0.25")
          .from(".hero-desc",        { opacity: 0, y: 16, duration: 0.5 }, "-=0.2")
          .from(".hero-cta",         { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, "-=0.25")
          .from(".hero-meta",        { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, "-=0.2")
          .from(".hero-photo",       { opacity: 0, x: 50, duration: 0.9 }, "-=0.9")
          .from(".hero-badge-float", { opacity: 0, scale: 0.85, duration: 0.5 }, "-=0.4");
      }, heroRef);
    });
    return () => ctx.revert?.();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSending(true); setFormMsg("");
    try {
      const res  = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      const data = await res.json();
      if (!res.ok || !data.ok) { setFormMsg("No se pudo enviar. Intenta nuevamente."); return; }
      form.reset();
      setFormMsg("¡Mensaje enviado! Te contactaremos pronto.");
    } catch { setFormMsg("Error al enviar el mensaje."); }
    finally   { setIsSending(false); }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">

      {/* ── NAV ── */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src={LOGO}
              alt="Dr. García Arrieta — Urólogo Tijuana"
              className={cn("h-9 w-auto transition-all duration-300", scrolled ? "brightness-0" : "brightness-0 invert")}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-widest">
            {[
              { label: "Especialista", href: "#especialista" },
              { label: "Servicios",    href: "#servicios" },
              { label: "HoLEP",       href: "#holep" },
              { label: "Testimonios", href: "#testimonios" },
              { label: "Contacto",    href: "#contacto" },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className={cn("hover:text-teal-500 transition-colors", scrolled ? "text-slate-500" : "text-white/70")}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={WA} target="_blank" rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all">
              <FaWhatsapp className="w-4 h-4" /> Agendar Cita
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className={cn("lg:hidden w-9 h-9 flex items-center justify-center rounded-full border transition-all",
                scrolled ? "border-slate-200 text-slate-600" : "border-white/20 text-white")}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 flex flex-col px-6">
          <nav className="flex flex-col gap-1 mt-6">
            {[
              { label: "Especialista", href: "#especialista" },
              { label: "Servicios",    href: "#servicios" },
              { label: "HoLEP",       href: "#holep" },
              { label: "Testimonios", href: "#testimonios" },
              { label: "Contacto",    href: "#contacto" },
            ].map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="text-2xl font-display font-medium py-4 border-b border-slate-100 text-slate-700 hover:text-teal-600 transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <a href={WA} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
              className="bg-teal-600 text-white text-center py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
              <FaWhatsapp className="w-5 h-5" /> Agendar en WhatsApp
            </a>
            <a href={`tel:${PHONE}`} onClick={() => setMenuOpen(false)}
              className="bg-slate-50 text-slate-700 text-center py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border border-slate-200">
              <Phone className="w-4 h-4" /> Llamar: {PHONE}
            </a>
          </div>
        </div>
      )}

      {/* ── HERO (split — navy bg, no amber) ── */}
      <section ref={heroRef as React.RefObject<HTMLElement>} id="inicio"
        className="min-h-screen bg-navy-950 flex items-stretch overflow-hidden">

        {/* Left: text */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[55%] px-6 lg:px-16 xl:px-24 pt-28 pb-20 bg-dot-grid">
          {/* teal glow blobs */}
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-teal-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-64 h-64 bg-teal-900/15 rounded-full blur-2xl pointer-events-none" />

          {/* Badge — teal, no amber */}
          <span className="hero-badge inline-flex items-center gap-2 self-start bg-teal-500/12 border border-teal-400/25 text-teal-300 text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-10">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Certificado — Consejo Nacional Mexicano de Urología
          </span>

          <h1 className="font-display font-extrabold text-white leading-[0.92] mb-5"
            style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}>
            <span className="hero-line block">Urología</span>
            <span className="hero-line block text-teal-400">de Vanguardia</span>
            <span className="hero-line block">en Tijuana</span>
          </h1>

          <p className="hero-name text-slate-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Dr. Francisco Arturo García Arrieta
          </p>
          <div className="hero-divider h-px w-16 bg-teal-500 mb-7" />

          <p className="hero-desc text-slate-300/60 text-lg font-light leading-relaxed max-w-md mb-10">
            Líder en cirugía prostática con láser HoLEP y ThuFLEP. Tecnología de punta
            y resultados reales para cada paciente en la frontera.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <a href={WA} target="_blank" rel="noreferrer"
              className="hero-cta flex items-center gap-2.5 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl shadow-teal-600/20 hover:-translate-y-0.5">
              <FaWhatsapp className="w-5 h-5" /> Agendar Consulta
            </a>
            <a href={`tel:${PHONE}`}
              className="hero-cta flex items-center gap-2.5 bg-white/6 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: <Clock className="w-3.5 h-3.5" />, text: "Urgencias 24/7" },
              { icon: <MapPin className="w-3.5 h-3.5" />, text: "Tijuana, BC" },
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "425+ reseñas 5★" },
            ].map((b, i) => (
              <span key={i} className="hero-meta flex items-center gap-1.5 text-white/30 text-xs">
                <span className="text-teal-400">{b.icon}</span>{b.text}
              </span>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="hidden lg:flex relative w-[45%] items-end overflow-hidden bg-navy-900">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/10 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent z-10 pointer-events-none" />
          <img src={DOCTOR_PHOTO} alt="Dr. Francisco Arturo García Arrieta — Urólogo Tijuana"
            className="hero-photo w-full h-full object-cover object-top select-none" />

          {/* Floating badge — teal, not amber */}
          <div className="hero-badge-float absolute bottom-10 right-8 z-20 bg-navy-900/95 backdrop-blur-md border border-teal-500/30 rounded-2xl p-5 shadow-2xl max-w-[200px]">
            <Award className="w-6 h-6 text-teal-400 mb-2" />
            <p className="text-[9px] uppercase tracking-widest font-bold text-teal-300 mb-1">Certificación</p>
            <p className="text-white/60 text-xs font-light leading-snug">Consejo Nacional Mexicano de Urología</p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-teal-600 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-white/85 text-xs font-semibold uppercase tracking-[0.2em] px-8 flex-shrink-0">
              {item}<span className="ml-8 text-teal-200">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS — navy bg, no amber accent ── */}
      <section className="bg-navy-900 py-20 px-5 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { n: "425+", label: "Reseñas verificadas", sub: "Doctoralia · Google" },
            { n: "80K+", label: "Seguidores en redes", sub: "Instagram · TikTok"  },
            { n: "24/7", label: "Línea de urgencias",  sub: "Disponibilidad total" },
            { n: "10+",  label: "Años de experiencia", sub: "Práctica consolidada" },
          ].map((s, i) => (
            <AnimBlock key={i} delay={i * 120}>
              <div className="group p-8 rounded-2xl bg-white/[0.04] border border-teal-500/10 hover:border-teal-400/30 hover:bg-white/[0.06] transition-all duration-300 text-center h-full">
                <p className="font-display font-extrabold leading-none mb-2 text-teal-400"
                  style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  {s.n}
                </p>
                <p className="text-white font-semibold text-sm mb-1">{s.label}</p>
                <p className="text-slate-500 text-xs">{s.sub}</p>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <AnimBlock className="mb-14">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Especialidades</span>
            <h2 className="font-display font-bold text-slate-900 leading-none" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              Servicios Urológicos
            </h2>
          </AnimBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICES.map((s, i) => (
              <AnimBlock key={i} delay={i * 25}>
                <div className="card-shine group p-6 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 cursor-default h-full bg-white">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                    <s.Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-base mb-2 group-hover:text-teal-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-3">{s.desc}</p>
                </div>
              </AnimBlock>
            ))}
          </div>

          <AnimBlock delay={100} className="mt-10 text-center">
            <a href={WA} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:text-teal-500 transition-colors group">
              ¿No encuentras tu tratamiento? Consúltanos directamente
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </AnimBlock>
        </div>
      </section>

      {/* ── HOLEP SPOTLIGHT — navy bg ── */}
      <section id="holep" className="bg-navy-950 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative overflow-hidden min-h-[380px] lg:min-h-0 order-2 lg:order-1">
            <AutoVideo src={VIDEO_HOLEP} className="w-full h-full object-cover min-h-[380px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-950/50 lg:bg-gradient-to-l pointer-events-none" />
            {/* teal glow overlay instead of plain dark */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-teal-900/10 pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24 order-1 lg:order-2">
            <AnimBlock>
              <div className="inline-flex items-center gap-2 bg-teal-500/12 border border-teal-400/20 text-teal-300 text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-8">
                <Zap className="w-3.5 h-3.5 fill-teal-300" /> Tecnología Láser
              </div>
              <h2 className="font-display font-extrabold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
                HoLEP: El Estándar<br />
                <span className="text-teal-400">de Oro Mundial</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-8 max-w-md">
                La enucleación prostática con láser Holmio es la técnica más avanzada para
                hiperplasia benigna. Recuperación rápida, sin hospitalización prolongada.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Procedimiento mínimamente invasivo",
                  "Resultados superiores a cirugía abierta",
                  "Hospitalización de solo 24 horas",
                  "Aplicable en próstatas de cualquier tamaño",
                ].map((pt, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />{pt}
                  </li>
                ))}
              </ul>
              <a href={WA} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl shadow-teal-600/20 self-start hover:-translate-y-0.5">
                <FaWhatsapp className="w-5 h-5" /> Consultar sobre HoLEP
              </a>
            </AnimBlock>
          </div>
        </div>
      </section>

      {/* ── PROCEDIMIENTOS EN VIDEO — navy bg, no slate-900 ── */}
      <section id="procedimientos" className="py-24 bg-navy-800">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <AnimBlock className="mb-14 text-center">
            <span className="text-teal-300 text-xs font-bold uppercase tracking-[0.3em] block mb-3">
              Reproducción automática al hacer scroll
            </span>
            <h2 className="font-display font-bold text-white leading-none" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              Procedimientos en Video
            </h2>
            <p className="text-slate-400 text-base font-light mt-4 max-w-lg mx-auto">
              Conoce de cerca la tecnología que el Dr. Arrieta utiliza en cada procedimiento.
            </p>
          </AnimBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROCEDURE_VIDEOS.map((v, i) => (
              <AnimBlock key={i} delay={i * 80}>
                <VideoCard {...v} />
              </AnimBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS — icon cards, sin números decorativos ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <AnimBlock className="mb-16 text-center">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Diferenciadores</span>
            <h2 className="font-display font-bold text-slate-900 leading-none" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              ¿Por qué elegir al<br />
              <span className="text-teal-600">Dr. Arrieta?</span>
            </h2>
          </AnimBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <AnimBlock key={i} delay={i * 100}>
                <div className="group flex flex-col p-8 rounded-3xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-500 h-full">
                  {/* icon + stat row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/25 group-hover:scale-110 transition-transform duration-300">
                      <item.Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-teal-600 text-xs font-bold uppercase tracking-widest bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-xl mb-3 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-base font-light leading-relaxed mb-6 flex-1">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTOR ── */}
      <section id="especialista" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimBlock>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-teal-50 to-slate-100 rounded-3xl" />
                <img src={DOCTOR_PHOTO} alt="Dr. Francisco Arturo García Arrieta — Urólogo Tijuana"
                  className="relative w-full rounded-3xl object-cover object-top aspect-[4/5] shadow-2xl" />
                {/* Certification badge — teal, not amber/gold */}
                <div className="absolute -bottom-6 -right-6 hidden md:block bg-teal-600 rounded-2xl p-6 shadow-2xl max-w-[220px]">
                  <Award className="w-7 h-7 mb-3 text-white opacity-80" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/70 mb-1">Certificación</p>
                  <p className="text-white/80 text-xs font-light leading-relaxed">
                    Consejo Nacional Mexicano de Urología
                  </p>
                </div>
              </div>
            </AnimBlock>

            <AnimBlock delay={120}>
              <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.3em] block mb-4">El Especialista</span>
              <h2 className="font-display font-bold leading-none text-slate-900 mb-6"
                style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                Dr. Francisco Arturo<br />
                <span className="text-teal-600">García Arrieta</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light mb-8">
                Urólogo certificado con enfoque en cirugía prostática con láser y técnicas
                endourológicas. Pionero en la adopción de HoLEP y ThuFLEP en la región
                fronteriza de Baja California.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  "Cédula Profesional: 09691953",
                  "Especialidad: 13399223",
                  "Certificado — Consejo Nacional Mexicano de Urología",
                  "Formación continua en instituciones internacionales",
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />{c}
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong className="text-slate-800">¿Paciente de EE.UU.?</strong>{" "}
                  Atendemos visitantes médicos internacionales y pacientes del otro lado de la frontera.
                </p>
              </div>

              <a href={WA} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg shadow-teal-600/20 hover:-translate-y-0.5">
                <FaWhatsapp className="w-5 h-5" /> Agendar con el Dr. Arrieta
              </a>
            </AnimBlock>
          </div>
        </div>
      </section>

      {/* ── HOSPITALS ── */}
      <section className="py-14 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <AnimBlock className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.3em]">Hospitales de Adscripción</p>
            <div className="flex flex-wrap gap-3">
              {HOSPITALS.map((h, i) => (
                <span key={i} className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all">
                  {h}
                </span>
              ))}
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* ── EMERGENCY CTA — teal, no amber ── */}
      <section className="py-20 bg-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <p className="text-teal-200/70 text-xs font-bold uppercase tracking-[0.3em] mb-3">Urgencias Urológicas</p>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}>
              ¿Necesitas atención<br />urgente?
            </h2>
            <p className="text-teal-100/65 text-base font-light mt-4 max-w-md">
              Contamos con línea de urgencias las 24 horas, los 7 días. No esperes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-2.5 bg-white text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl hover:-translate-y-0.5">
              <Phone className="w-5 h-5" /> Llamar ahora
            </a>
            <a href={WA} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2.5 bg-teal-800 hover:bg-teal-900 text-white border border-teal-600 px-8 py-4 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5">
              <FaWhatsapp className="w-5 h-5" /> WhatsApp Urgencias
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — navy bg (≠ pure black) ── */}
      <section id="testimonios" className="py-24 bg-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-12">
          <AnimBlock>
            <span className="text-teal-400 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Pacientes</span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-display font-bold text-white leading-none" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
                +425 Reseñas<br /><span className="text-teal-400">Verificadas</span>
              </h2>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                <span className="text-slate-400 text-sm ml-2">5.0 promedio</span>
              </div>
            </div>
          </AnimBlock>
        </div>

        {/* Row 1 */}
        <div className="mb-4 overflow-hidden">
          <div className="flex animate-marquee-slow">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
        {/* Row 2 */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── SOCIAL ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <AnimBlock className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.3em] mb-2">Redes Sociales</p>
              <h3 className="font-display font-bold text-slate-900 text-3xl">
                Síguenos y aprende<br />sobre urología
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "https://www.instagram.com/dr_arrieta/",    icon: <FaInstagram />, label: "Instagram", count: "36K" },
                { href: "https://www.tiktok.com/@dr_arrieta",       icon: <FaTiktok />,    label: "TikTok",    count: "44K" },
                { href: "#",                                         icon: <FaFacebookF />, label: "Facebook",  count: "" },
                { href: "https://www.youtube.com/@user-hp9li8eu7b", icon: <FaYoutube />,   label: "YouTube",   count: "" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2.5 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 text-slate-700 hover:text-teal-700 px-5 py-3 rounded-full text-sm font-semibold transition-all">
                  {s.icon} {s.label}
                  {s.count && <span className="text-teal-600 font-bold">{s.count}</span>}
                </a>
              ))}
            </div>
          </AnimBlock>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimBlock>
              <span className="text-teal-600 text-xs font-bold uppercase tracking-[0.3em] block mb-4">Agenda tu Cita</span>
              <h2 className="font-display font-bold text-slate-900 leading-none mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                Contáctanos
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-10 max-w-sm">
                Escríbenos y te respondemos a la brevedad. Para urgencias, llama directamente.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: <Phone className="w-5 h-5" />,      label: "Teléfono / Urgencias", value: PHONE,              href: `tel:${PHONE}` },
                  { icon: <FaWhatsapp className="w-5 h-5" />, label: "WhatsApp",              value: "Escríbenos ahora", href: WA, ext: true },
                  { icon: <Mail className="w-5 h-5" />,       label: "Correo",                value: EMAIL,              href: `mailto:${EMAIL}` },
                  { icon: <MapPin className="w-5 h-5" />,     label: "Ubicación",             value: "Tijuana, Baja California" },
                  { icon: <Clock className="w-5 h-5" />,      label: "Urgencias",             value: "24 horas · 7 días" },
                ].map((row, i) => (
                  <div key={i}>
                    {row.href ? (
                      <a href={row.href} target={row.ext ? "_blank" : undefined} rel={row.ext ? "noreferrer" : undefined}
                        className="flex items-center gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0">{row.icon}</div>
                        <div>
                          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest mb-0.5">{row.label}</p>
                          <p className="text-slate-800 font-medium text-sm group-hover:text-teal-600 transition-colors">{row.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">{row.icon}</div>
                        <div>
                          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest mb-0.5">{row.label}</p>
                          <p className="text-slate-800 font-medium text-sm">{row.value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AnimBlock>

            <AnimBlock delay={120}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-lg">
                <h3 className="font-display font-semibold text-xl text-slate-900 mb-7">Enviar Mensaje</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <Field label="Nombre"   name="name"  placeholder="Tu nombre" />
                    <Field label="Teléfono" name="phone" placeholder="664-000-0000" type="tel" />
                  </div>
                  <Field label="Correo Electrónico" name="email" placeholder="correo@ejemplo.com" type="email" />
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-2">Motivo de Consulta</label>
                    <select name="subject" required
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="">Selecciona un servicio...</option>
                      {SERVICES.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                      <option value="Consulta general">Consulta general</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-2">Mensaje</label>
                    <textarea name="message" required rows={4} placeholder="Describe tu situación o consulta..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none placeholder:text-slate-300" />
                  </div>
                  {formMsg && <p className="text-sm font-medium text-teal-600">{formMsg}</p>}
                  <button type="submit" disabled={isSending}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-teal-600/20 disabled:opacity-50">
                    {isSending ? "Enviando..." : "Enviar Mensaje"}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    O escríbenos por{" "}
                    <a href={WA} target="_blank" rel="noreferrer" className="text-teal-500 hover:underline font-medium">WhatsApp</a>
                  </p>
                </form>
              </div>
            </AnimBlock>
          </div>
        </div>
      </section>

      {/* ── FOOTER — navy, not pure black ── */}
      <footer className="bg-navy-950 pt-14 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <img src={LOGO} alt="Dr. García Arrieta" className="h-10 w-auto mb-4 brightness-0 invert opacity-60" />
              <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xs">
                Precisión quirúrgica, tecnología de vanguardia y resultados reales para cada paciente.
              </p>
            </div>
            <div>
              <p className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">Contacto</p>
              <div className="space-y-2 text-slate-500 text-sm font-light">
                <p>{PHONE}</p><p>{EMAIL}</p><p>Tijuana, Baja California</p><p>Urgencias 24/7</p>
              </div>
            </div>
            <div>
              <p className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4">Cédulas</p>
              <div className="space-y-2 text-slate-500 text-sm font-light">
                <p>Profesional: 09691953</p><p>Especialidad: 13399223</p><p>Certificado CNMU</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs font-light">
              © 2026 Centro Urológico Tijuana · Todos los derechos reservados
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: "https://www.instagram.com/dr_arrieta/",    icon: <FaInstagram />, label: "Instagram" },
                { href: "https://www.tiktok.com/@dr_arrieta",       icon: <FaTiktok />,    label: "TikTok" },
                { href: "#",                                         icon: <FaFacebookF />, label: "Facebook" },
                { href: "https://www.youtube.com/@user-hp9li8eu7b", icon: <FaYoutube />,   label: "YouTube" },
                { href: WA,                                          icon: <FaWhatsapp />,  label: "WhatsApp" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-slate-500 hover:text-teal-400 hover:border-teal-800 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Float WA (desktop) */}
      <a href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5b] rounded-full items-center justify-center shadow-2xl shadow-green-500/40 transition-all hover:scale-110">
        <FaWhatsapp className="w-7 h-7 text-white" />
      </a>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/97 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex gap-2 shadow-2xl shadow-black/10">
        <a href={`tel:${PHONE}`}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold text-sm transition-all">
          <Phone className="w-4 h-4" /> Llamar
        </a>
        <a href={WA} target="_blank" rel="noreferrer"
          className="flex-[2] flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all">
          <FaWhatsapp className="w-5 h-5" /> Agendar por WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─── sub-components ─── */

function AnimBlock({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useInView() as React.RefObject<HTMLDivElement>;
  return (
    <div ref={ref} data-animate className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function AutoVideo({ src, className }: { src: string; className?: string }) {
  const ref = useVideoScroll(0.35);
  return <video ref={ref} src={src} muted loop playsInline className={className} />;
}

function VideoCard({ src, tag, title, desc }: { src: string; tag: string; title: string; desc: string }) {
  const videoRef  = useVideoScroll(0.5);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play().catch(() => {}) : v.pause();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-900 group aspect-video cursor-pointer" onClick={toggle}>
      <video ref={videoRef} src={src} muted={muted} loop playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

      <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300",
        playing ? "opacity-0 group-hover:opacity-100" : "opacity-100")}>
        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110">
          {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </div>
      </div>

      <button onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest block mb-1">{tag}</span>
        <h3 className="text-white font-display font-bold text-xl mb-1">{title}</h3>
        <p className="text-white/50 text-sm font-light">{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, src }: { quote: string; author: string; src: string }) {
  return (
    <div className="inline-flex flex-col shrink-0 whitespace-normal w-72 p-6 rounded-2xl bg-white/[0.04] border border-teal-500/10 hover:border-teal-400/25 transition-all mx-2 align-top">
      <div className="flex gap-0.5 mb-4 shrink-0">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
      </div>
      <blockquote className="text-slate-300 text-sm leading-relaxed font-light mb-5 flex-1">"{quote}"</blockquote>
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center text-teal-300 font-bold text-xs shrink-0">
          {author[0]}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{author}</p>
          <p className="text-teal-400 text-xs">{src}</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text" }: {
  label: string; name: string; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-2">{label}</label>
      <input id={name} name={name} type={type} required placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-300" />
    </div>
  );
}
