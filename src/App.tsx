import { useCallback, useEffect, useState } from 'react';
import type { Product } from './types';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { StoreHeader, PromoHero, CategoryShortcuts, PartnerBanners, BrandStrip, Newsletter, StoreFooter } from './components/StoreSections';

const PRODUCTS_URL = 'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';
const categories = ['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS', 'VER TODOS'];

async function loadProducts(url: string, signal: AbortSignal): Promise<Product[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Falha ao carregar a lista (${response.status}).`);
  const data = await response.json() as { products?: Product[] };
  if (!Array.isArray(data.products)) throw new Error('Formato de produtos inválido.');
  return data.products;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('CELULAR');
  const [firstVisible, setFirstVisible] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    loadProducts(PRODUCTS_URL, controller.signal)
      .catch((remoteError: unknown) => {
        if (controller.signal.aborted) throw remoteError;
        return loadProducts('/produtos.json', controller.signal);
      })
      .then(setProducts)
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== 'AbortError') setError(reason.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const closeProductModal = useCallback(() => setSelected(null), []);

  const visibleProducts = products.length
    ? Array.from({ length: Math.min(4, products.length) }, (_, index) => products[(firstVisible + index) % products.length])
    : [];
  const step = (direction: number) => setFirstVisible((value) => (value + direction + products.length) % products.length);

  return (
    <>
      <StoreHeader />
      <main>
        <PromoHero />
        <CategoryShortcuts />

        <section className="showcase" aria-labelledby="showcase-title">
          <div className="section-title">
            <span aria-hidden="true" />
            <h2 id="showcase-title">Produtos relacionados</h2>
            <span aria-hidden="true" />
          </div>
          <nav className="category-nav" aria-label="Categorias de produtos">
            {categories.map((category) => (
              <button type="button" key={category}
                className={activeCategory === category ? 'category-nav__item is-active' : 'category-nav__item'}
                aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                {category}
              </button>
            ))}
          </nav>
          <section className="carousel" id="produtos" aria-label="Produtos disponíveis">
            <button className="carousel__arrow carousel__arrow--left" type="button" aria-label="Produtos anteriores" onClick={() => step(-1)} disabled={products.length < 2}><span /></button>
            {loading ? <p className="carousel__message" role="status">Carregando produtos…</p>
              : error ? <p className="carousel__message" role="alert">{error}</p>
                : <div className="product-grid">{visibleProducts.map((product, index) => <ProductCard key={`${product.productName}-${firstVisible}-${index}`} product={product} onOpen={setSelected} />)}</div>}
            <button className="carousel__arrow carousel__arrow--right" type="button" aria-label="Próximos produtos" onClick={() => step(1)} disabled={products.length < 2}><span /></button>
          </section>
        </section>

        <PartnerBanners />
        <section className="showcase showcase--second" aria-labelledby="more-products-title">
          <div className="section-title"><span aria-hidden="true" /><h2 id="more-products-title">Produtos relacionados</h2><span aria-hidden="true" /></div>
          <a className="showcase__all" href="#produtos">Ver todos</a>
          <section className="carousel" aria-label="Mais produtos">
            <button className="carousel__arrow carousel__arrow--left" type="button" aria-label="Produtos anteriores" onClick={() => step(-1)} disabled={products.length < 2}><span /></button>
            {loading ? <p className="carousel__message" role="status">Carregando produtos…</p> : error ? <p className="carousel__message" role="alert">{error}</p> : <div className="product-grid">{visibleProducts.map((product, index) => <ProductCard key={`second-${product.productName}-${firstVisible}-${index}`} product={product} onOpen={setSelected} />)}</div>}
            <button className="carousel__arrow carousel__arrow--right" type="button" aria-label="Próximos produtos" onClick={() => step(1)} disabled={products.length < 2}><span /></button>
          </section>
        </section>
        <PartnerBanners />
        <BrandStrip />
      </main>
      <Newsletter />
      <StoreFooter />
      <ProductModal product={selected} onClose={closeProductModal} />
    </>
  );
}
