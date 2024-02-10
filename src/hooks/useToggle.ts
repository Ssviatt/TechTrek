import { Product } from '../types/Product';

export const useToggle = (
  nameProd: string,
  products: Product[],
  setProducts: (newProducts: Product[]) => void,
  carrProduct: Product,
): [boolean, (
  ) => void] => {
  const isSelected = products.some((prod) => prod.id === carrProduct.id);

  const toggler = () => {
    const updatedProducts = isSelected
      ? products.filter((prod) => prod.id !== carrProduct.id)
      : [...products, carrProduct];

    setProducts(updatedProducts);
    localStorage.setItem(nameProd, JSON.stringify(updatedProducts));
  };

  return [isSelected, toggler];
};
