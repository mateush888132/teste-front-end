import { useState } from 'react';
import type { ReactNode } from 'react';

const shortcuts = [
  { name: 'Tecnologia', icon: 'devices' }, { name: 'Supermercado', icon: 'market' },
  { name: 'Bebidas', icon: 'bottle' }, { name: 'Ferramentas', icon: 'tools' },
  { name: 'Saúde', icon: 'health' }, { name: 'Esportes e Fitness', icon: 'fitness' }, { name: 'Moda', icon: 'fashion' },
];

function BrandLogo({ light = false }: { light?: boolean }) {
  return <span className={`brand-logo${light ? ' brand-logo--light' : ''}`}><span className="brand-logo__mark">ec</span><span>onverse</span></span>;
}

function LineIcon({ name }: { name: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const shapes: Record<string, ReactNode> = {
    devices: <><rect x="7" y="5" width="29" height="24" rx="2"/><path d="M14 36h15M21 29v7"/><rect x="25" y="20" width="13" height="19" rx="2"/><path d="M30 35h3"/></>,
    market: <><path d="M5 16h34l-3-9H8zM7 16v21h30V16M5 16c0 7 10 7 10 0 0 7 10 7 10 0 0 7 10 7 10 0 0 7 7 7 7 0"/><path d="M13 37V25h8v12M26 25h7v7h-7"/></>,
    bottle: <><path d="M17 5h8v6l4 4v22H13V15l4-4zM17 11h8M13 18h16M19 5v-3h4v3M17 23c4-4 9 2 4 4-4 2 0 5 4 2M33 26h7v11h-7zM34 29h5"/></>,
    tools: <><path d="m7 7 7-4 8 8-4 7-8-8zM19 18l17 17-5 5-17-17M30 5a8 8 0 0 0 8 10l-9 9-6-6 9-9M5 35l13-13 6 6-13 13a4 4 0 0 1-6-6z"/></>,
    health: <><path d="M22 37S4 26 4 15a9 9 0 0 1 17-4 9 9 0 0 1 17 4c0 11-16 22-16 22zM7 33l8-5 7 5 10-5c4-2 6 2 3 4l-12 8H14zM3 30l8-5 7 10-8 5z"/></>,
    fitness: <><path d="M6 37h34M9 33l5-18 8-6 7 7 5 2M27 7l-2-4 5-1 3 4-3 4zM17 17l8 4 4 8M22 19l-6 9-7-2M30 21l6-3 3 3M12 37V27M16 37v-4M35 37v-6"/></>,
    fashion: <><path d="M12 5c0 8 3 11 10 11s10-3 10-11M15 14l-5 23 12-5 12 5-5-23M22 16l-2 8 5 3 5-5-5-6M33 9l8 9-7 7-8-9zM34 16l4 4"/></>,
  };
  return <svg viewBox="0 0 44 44" aria-hidden="true" {...common}>{shapes[name]}</svg>;
}

function SearchIcon() { return <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m18.5 18.5 6 6"/></svg>; }
function HeaderIcon({ kind }: { kind: string }) {
  const paths: Record<string, ReactNode> = {
    orders: <><path d="M5 9h18v14H5zM8 9V5h12v4M8 14h4m5 0h3M9 23v-4h10v4"/><path d="m2 8 3-3m18 3-3-3"/></>,
    heart: <path d="M14 24S3 17 3 10a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7-11 14-11 14Z"/>,
    user: <><circle cx="14" cy="14" r="11"/><circle cx="14" cy="10" r="4"/><path d="M6 23c1-5 5-7 8-7s7 2 8 7"/></>,
    cart: <><path d="M2 4h3l3 16h15l4-12H7M10 25h.1M21 25h.1"/><circle cx="10" cy="25" r="1.5"/><circle cx="21" cy="25" r="1.5"/></>,
  };
  return <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

export function StoreHeader() {
  return <header className="store-header">
    <div className="store-header__top">
      <a className="store-header__logo" href="#top" aria-label="Econverse, início"><BrandLogo /></a>
      <form className="store-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="store-search">O que você está buscando?</label>
        <input id="store-search" placeholder="O que você está buscando?" />
        <button type="submit" aria-label="Buscar"><SearchIcon /></button>
      </form>
      <nav className="store-actions" aria-label="Minha conta">
        {['orders', 'heart', 'user', 'cart'].map((icon, index) => <a key={icon} href="#" aria-label={['Meus pedidos', 'Favoritos', 'Minha conta', 'Carrinho'][index]}><HeaderIcon kind={icon} /></a>)}
      </nav>
    </div>
    <nav className="main-nav" aria-label="Navegação principal">
      {['TODAS CATEGORIAS', 'SUPERMERCADO', 'LIVROS', 'MODA', 'LANÇAMENTOS', 'OFERTAS DO DIA', '♛  ASSINATURA'].map((item) => <a className={item === 'OFERTAS DO DIA' ? 'is-current' : ''} href="#categorias" key={item}>{item}</a>)}
    </nav>
  </header>;
}

export function PromoHero() {
  return <section className="promo-hero" id="top" aria-label="Promoções de Black Friday">
    <div className="promo-hero__shade" />
    <div className="promo-hero__content">
      <h1>Venha conhecer nossas<br />promoções</h1>
      <p><strong>50% Off</strong> nos produtos</p>
      <a className="yellow-button" href="#produtos">Ver produto</a>
    </div>
  </section>;
}

export function CategoryShortcuts() {
  return <nav className="shortcut-categories" id="categorias" aria-label="Explore por categoria">
    {shortcuts.map((category, index) => <a key={category.name} className={index === 0 ? 'shortcut-category is-selected' : 'shortcut-category'} href="#produtos">
      <span className="shortcut-category__icon"><LineIcon name={category.icon} /></span><span>{category.name}</span>
    </a>)}
  </nav>;
}

export function PartnerBanners() {
  return <section className="partner-banners" aria-label="Nossos parceiros">
    {[1, 2].map((number) => <article className={`partner-banner partner-banner--${number}`} key={number}>
      <div><h2>Parceiros</h2><p>Lorem ipsum dolor sit<br />amet, consectetur</p><a className="yellow-button" href="#marcas">CONFIRA</a></div>
    </article>)}
  </section>;
}

export function BrandStrip() {
  return <section className="brand-strip" id="marcas" aria-labelledby="brand-title">
    <h2 id="brand-title">Navegue por marcas</h2>
    <div className="brand-strip__items">{Array.from({ length: 5 }, (_, index) => <a href="#produtos" className="brand-circle" key={index} aria-label="Produtos Econverse"><BrandLogo /></a>)}</div>
  </section>;
}

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return <section className="newsletter" aria-labelledby="newsletter-title">
    <div className="newsletter__copy"><h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2><p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos<br className="desktop-break" /> da Econverse.</p></div>
    <form className="newsletter__form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <div className="newsletter__fields"><label className="sr-only" htmlFor="newsletter-name">Digite seu nome</label><input id="newsletter-name" name="name" placeholder="Digite seu nome" required />
        <label className="sr-only" htmlFor="newsletter-email">Digite seu e-mail</label><input id="newsletter-email" name="email" type="email" placeholder="Digite seu e-mail" required />
        <button className="yellow-button" type="submit">INSCREVER</button></div>
      <label className="newsletter__terms"><input type="checkbox" required /> Aceito os termos e condições</label>
      {submitted && <p className="newsletter__success" role="status">Inscrição recebida. Obrigado!</p>}
    </form>
  </section>;
}

export function StoreFooter() {
  return <footer className="store-footer">
    <div className="store-footer__main">
      <section className="store-footer__about"><BrandLogo /><p>Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit.</p><div className="social-links">
        <a href="#instagram" aria-label="Instagram"><svg viewBox="0 0 36 36" aria-hidden="true"><rect x="3" y="3" width="30" height="30" rx="8"/><circle cx="18" cy="18" r="7"/><circle className="social-links__dot" cx="27" cy="9.5" r="1.6"/></svg></a>
        <a href="#facebook" aria-label="Facebook"><svg viewBox="0 0 36 36" aria-hidden="true"><path d="M21.5 33V19h4.8l.7-5.5h-5.5V10c0-1.6.5-2.7 2.8-2.7h3V2.4c-.5-.1-2.3-.2-4.4-.2-4.4 0-7.4 2.7-7.4 7.7v3.6h-5V19h5v14z"/></svg></a>
        <a href="#linkedin" aria-label="LinkedIn"><svg viewBox="0 0 36 36" aria-hidden="true"><path d="M5 13h5v20H5zM7.5 4.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6ZM15 13h4.8v2.7c1.1-1.9 2.9-3.2 5.7-3.2 5.1 0 6.5 3.4 6.5 8V33h-5V21.7c0-2.7-.5-4.5-3.2-4.5s-3.8 2-3.8 4.5V33h-5z"/></svg></a>
      </div></section>
      <div className="footer-column"><h2>Institucional</h2><a href="#sobre">Sobre Nós</a><a href="#movimento">Movimento</a><a href="#trabalhe">Trabalhe conosco</a></div>
      <div className="footer-column"><h2>Ajuda</h2><a href="#suporte">Suporte</a><a href="#contato">Fale Conosco</a><a href="#faq">Perguntas Frequentes</a></div>
      <div className="footer-column"><h2>Termos</h2><a href="#termos">Termos e Condições</a><a href="#privacidade">Política de Privacidade</a><a href="#troca">Troca e Devolução</a></div>
    </div>
    <p className="store-footer__copyright">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </footer>;
}
