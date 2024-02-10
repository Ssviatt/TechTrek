import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../Store';
import { ProductCard } from '../../components/ProductCard';
import { ShowLocation } from '../../components/ShowLocation';
import { filterByName } from '../../utils/filterHelper';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favouritesProducts = useProducts(state => state.favouritesProducts);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const visibleProducts = filterByName(favouritesProducts, query);

  return (
    <>
      <ShowLocation />
      <h1>Favourites</h1>
      <p className={`bodyText ${styles.countProducts}`}>{`${visibleProducts.length} models`}</p>

      {!visibleProducts.length && !!favouritesProducts.length && (
        <h2>There are no matching results</h2>
      )}

      {favouritesProducts.length ? (
        <div className={styles.favourites}>
          {visibleProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )
        : (
          <h2>There are no favorites yet</h2>
        )}
    </>
  );
};
