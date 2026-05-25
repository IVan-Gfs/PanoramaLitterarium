import { useState, useEffect, useRef } from "react";
import { Home, Search, Settings } from 'lucide-react';

import '../assets/css/home.css';
/* ─── tipos ─── */
interface Contest {
  id: number;
  title: string;
  category: string;
  deadline: string;
  prize: string;
  location: string;
  organizer: string;
  color: string;
  accent: string;
  featured?: boolean;
}

interface BannerSlide {
  id: number;
  image?: string;
  bgColor: string;
  tag: string;
  title: string;
  subtitle: string;
  prize: string;
  cta: string;
  accentColor: string;
  isOrganizer?: boolean;
}

/* ─── dados mock ─── */
const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    image: "/uploads/capa_concurso_lura_teste.png",
    bgColor: "#6B21A8",
    tag: "Poesia",
    title: "Viva Poesia 2025",
    subtitle: "Publique seu poema e concorra à maior coletânea poética do Brasil",
    prize: "R$ 20.000 em prêmios",
    cta: "Inscreva-se agora",
    accentColor: "#FCD34D",
  },
  {
    id: 2,
    bgColor: "#1E3A5F",
    tag: "Conto",
    title: "Grande Prêmio do Conto Nacional",
    subtitle: "A mais tradicional seleção de contos curtos do país, já na 12ª edição",
    prize: "R$ 15.000 em prêmios",
    cta: "Ver edital",
    accentColor: "#38BDF8",
  },
  {
    id: 3,
    bgColor: "#134E4A",
    tag: "Romance",
    title: "Revelações — Romance Inédito",
    subtitle: "Sua história pode transformar o mercado editorial. Inscrições abertas.",
    prize: "R$ 30.000 + publicação",
    cta: "Participar",
    accentColor: "#4ADE80",
  },
];

const FEATURED_CONTESTS: Contest[] = [
  {
    id: 1,
    title: "Chamada Poesia Na Alma – Maio",
    category: "Poesia",
    deadline: "31/05/2025",
    prize: "R$ 5.000",
    location: "Nacional",
    organizer: "Instituto Letra Viva",
    color: "#EDE9FE",
    accent: "#7C3AED",
  },
  {
    id: 2,
    title: "Prêmio Narrativas do Sertão",
    category: "Conto",
    deadline: "15/06/2025",
    prize: "R$ 8.000",
    location: "Nordeste",
    organizer: "Academia Nordestina de Letras",
    color: "#FEF9C3",
    accent: "#B45309",
  },
  {
    id: 3,
    title: "Olhares — Fotografia e Texto",
    category: "Híbrido",
    deadline: "10/06/2025",
    prize: "R$ 3.000",
    location: "São Paulo – SP",
    organizer: "Galeria Palavra & Imagem",
    color: "#DCFCE7",
    accent: "#15803D",
  },
  {
    id: 4,
    title: "Jovens Vozes Literárias 2025",
    category: "Crônica",
    deadline: "20/06/2025",
    prize: "R$ 4.500",
    location: "Nacional",
    organizer: "Fundação Cultural Horizonte",
    color: "#FCE7F3",
    accent: "#9D174D",
  },
  {
    id: 5,
    title: "Grande Prêmio do Conto Nacional",
    category: "Conto",
    deadline: "30/06/2025",
    prize: "R$ 15.000",
    location: "Nacional",
    organizer: "Editora Meridiano",
    color: "#E0F2FE",
    accent: "#0369A1",
  },
  {
    id: 6,
    title: "Revelações — Romance Inédito",
    category: "Romance",
    deadline: "01/07/2025",
    prize: "R$ 30.000",
    location: "Nacional",
    organizer: "Selo Pena de Ouro",
    color: "#FEF3C7",
    accent: "#92400E",
  },
];

const STATS = [
  { label: "Concursos ativos", value: "148" },
  { label: "Escritores cadastrados", value: "12.400+" },
  { label: "Organizações parceiras", value: "83" },
  { label: "Prêmios distribuídos", value: "R$ 2,1 M" },
];

const CATEGORIES = [
  { label: "Poesia", icon: "✦", count: 42 },
  { label: "Conto", icon: "◈", count: 38 },
  { label: "Crônica", icon: "◇", count: 21 },
  { label: "Romance", icon: "▣", count: 17 },
  { label: "Infantojuvenil", icon: "◉", count: 14 },
  { label: "Híbrido", icon: "◐", count: 9 },
];

/* ─── componentes ─── */

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      go((current + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current]);

  const slide = BANNER_SLIDES[current];

  return (
    <section className="banner-section">
      <div
        className={`banner-slide ${animating ? "banner-fade-out" : "banner-fade-in"}`}
        style={{ background: slide.bgColor }}
      >
        {/* Decorative overlay */}
        <div className="banner-overlay" />

        <div className="banner-content">
          <div className="banner-text">
            <span className="banner-tag" style={{ color: slide.accentColor, borderColor: slide.accentColor }}>
              {slide.tag}
            </span>
            <h2 className="banner-title">{slide.title}</h2>
            <p className="banner-subtitle">{slide.subtitle}</p>
            <div className="banner-prize" style={{ color: slide.accentColor }}>
              🏆 {slide.prize}
            </div>
            <button className="banner-cta" style={{ background: slide.accentColor }}>
              {slide.cta}
            </button>
          </div>

          {slide.image && (
            <div className="banner-image-wrap">
              <img src={slide.image} alt={slide.title} className="banner-image" />
            </div>
          )}

          {!slide.image && (
            <div className="banner-placeholder" style={{ borderColor: slide.accentColor }}>
              <span style={{ color: slide.accentColor, fontSize: "3rem" }}>✦</span>
            </div>
          )}
        </div>

        {/* Nav arrows */}
        <button className="banner-arrow left" onClick={() => go((current - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}>
          ‹
        </button>
        <button className="banner-arrow right" onClick={() => go((current + 1) % BANNER_SLIDES.length)}>
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="banner-dots">
        {BANNER_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`banner-dot ${i === current ? "active" : ""}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}

function StatBar() {
  return (
    <section className="stat-bar">
      {STATS.map((s) => (
        <div key={s.label} className="stat-item">
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  );
}

function CategoryGrid() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="section categories-section">
      <div className="section-header">
        <h2 className="section-title">Explorar por categoria</h2>
        <a href="/concursos" className="section-link">Ver todos →</a>
      </div>
      <div className="categories-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            className={`category-card ${active === cat.label ? "active" : ""}`}
            onClick={() => setActive(active === cat.label ? null : cat.label)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
            <span className="category-count">{cat.count} concursos</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ContestCard({ contest }: { contest: Contest }) {
  const daysLeft = () => {
    const [d, m, y] = contest.deadline.split("/").map(Number);
    const diff = new Date(y, m - 1, d).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
  };
  const days = daysLeft();

  return (
    <div className="contest-card">
      <div className="contest-card-top" style={{ background: contest.color }}>
        <span className="contest-category-badge" style={{ color: contest.accent, borderColor: contest.accent }}>
          {contest.category}
        </span>
        <h3 className="contest-title" style={{ color: contest.accent }}>
          {contest.title}
        </h3>
      </div>
      <div className="contest-card-body">
        <div className="contest-meta">
          <span>📍 {contest.location}</span>
          <span>🏛️ {contest.organizer}</span>
        </div>
        <div className="contest-footer">
          <div className="contest-prize">{contest.prize}</div>
          <div className={`contest-deadline ${days <= 7 ? "urgent" : ""}`}>
            {days === 0 ? "Último dia!" : `${days} dias restantes`}
          </div>
        </div>
        <button className="contest-btn" style={{ borderColor: contest.accent, color: contest.accent }}>
          Ver concurso
        </button>
      </div>
    </div>
  );
}

function FeaturedContests() {
  return (
    <section className="section" style={{ background: "var(--bg-subtle)" }}>
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Concursos em destaque</h2>
          <a href="/concursos" className="section-link">Ver todos os concursos →</a>
        </div>
        <div className="contests-grid">
          {FEATURED_CONTESTS.map((c) => <ContestCard key={c.id} contest={c} />)}
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <section className="search-section">
      <div className="search-inner">
        <h1 className="hero-title">Encontre e participe de concursos literários</h1>
        <p className="hero-subtitle">
          Saudações, escritor! Filtre <strong>concursos</strong> e <strong>seleções literárias</strong> por categoria,
          localidade e prazo. Leia os editais e inscreva-se diretamente pelo <em>Panorama Litterarium</em>.
        </p>
        <div className="search-box">
          <span className="search-icon"><Search /></span>
          <input
            type="text"
            placeholder="Buscar concurso por título, categoria ou localidade..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">Buscar</button>
        </div>
      </div>
    </section>
  );
}

function OrganizerBanner() {
  return (
    <section
      className="organizer-banner"
      style={{ backgroundImage: "url('/uploads/background_datilografia.png')" }}
      onClick={() => window.location.href = "/para-organizadores"}
      role="link"
      tabIndex={0}
    >
      <div className="organizer-overlay" />
      <div className="organizer-content">
        <div className="organizer-arrow">←</div>
        <div className="organizer-text">
          <h2 className="organizer-title">PUBLIQUE CONCURSOS</h2>
          <p className="organizer-sub">CADASTRE SUA ORGANIZAÇÃO E:</p>
          <ul className="organizer-list">
            <li>✦ Publique concursos ilimitados</li>
            <li>✦ Receba as inscrições digitalmente</li>
            <li>✦ Use a ferramenta avaliativa integrada</li>
            <li>✦ Divulgue o resultado automaticamente</li>
          </ul>
          <button className="organizer-cta">Saiba mais sobre o Panorama para Organizadores →</button>
        </div>
      </div>
    </section>
  );
}

function LibraryBanner() {
  return (
    <section
      className="library-banner"
      style={{ backgroundImage: "url('/uploads/background_livros.png')" }}
    >
      <div className="library-overlay" />
      <div className="library-content">
        <div className="library-text">
          <h2 className="library-title">VEJA OS DEMAIS CONCURSOS</h2>
          <p className="library-sub">ENCONTRE CONCURSOS FILTRANDO POR:</p>
          <ul className="library-list">
            <li>· Categoria</li>
            <li>· Localização</li>
            <li>· Prazo de inscrição</li>
            <li>· Nome do concurso</li>
          </ul>
        </div>
        <a href="/concursos" className="library-arrow">→</a>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-icon">✉</div>
        <h2 className="newsletter-title">Receba novos concursos na sua caixa de entrada</h2>
        <p className="newsletter-sub">Selecione suas categorias favoritas e seja o primeiro a saber.</p>
        {sent ? (
          <p className="newsletter-thanks">✓ Inscrição confirmada! Fique atento à sua caixa de entrada.</p>
        ) : (
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button className="newsletter-btn" onClick={() => email && setSent(true)}>
              Inscrever-me
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── página principal ─── */
export default function HomePage() {
  return (
    <main className="inicio-main">
      <SearchBar />
      <StatBar />
      <BannerCarousel />
      <CategoryGrid />
      <FeaturedContests />
      <LibraryBanner />
      <OrganizerBanner />
      <NewsletterSection />
    </main>
  );
}