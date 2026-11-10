import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <article className="product-card">
      <button className="product-card__image-button" type="button" onClick={() => onOpen(product)} aria-label={`Ver detalhes de ${product.productName}`}>
        <img className="product-card__image" src={product.photo} alt={product.productName} loading="lazy" />
      </button>
      <div className="product-card__details">
        <h2 className="product-card__description">{product.descriptionShort}</h2>
        <p className="product-card__price">{money(product.price)}</p>
        <p className="product-card__installments">ou 2x de {money(product.price / 2)} sem juros</p>
        <p className="product-card__shipping">Frete grátis</p>
        <button className="product-card__buy" type="button" onClick={() => onOpen(product)}>COMPRAR</button>
      </div>
    </article>
  );
}
