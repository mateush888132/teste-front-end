import { useEffect, useRef } from 'react';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export function ProductModal({ product, onClose }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;

      const dialog = document.querySelector<HTMLElement>('.product-modal');
      const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
      previouslyFocused?.focus();
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeButtonRef} className="product-modal__close" type="button" onClick={onClose} aria-label="Fechar detalhes">×</button>
        <div className="product-modal__media">
          <img src={product.photo} alt={product.productName} />
        </div>
        <div className="product-modal__content">
          <p className="product-modal__eyebrow">PRODUTO</p>
          <h2 id="modal-title">{product.productName}</h2>
          <p className="product-modal__description">{product.descriptionShort}</p>
          <p className="product-modal__price">{money(product.price)}</p>
          <p className="product-modal__installments">ou 2x de {money(product.price / 2)} sem juros</p>
          <p className="product-modal__shipping">Frete grátis</p>
          <button className="product-modal__buy" type="button" onClick={onClose}>COMPRAR</button>
        </div>
      </section>
    </div>
  );
}
