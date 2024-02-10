import { useLocation, Link, useParams } from 'react-router-dom';
import { Icon } from '../Icon';

import styles from './ShowLocation.module.scss';
import Home from '../../img/icons/Home.svg';
import arrowRight from '../../img/icons/ArrowRight.svg';

import { camelCase } from '../../utils/camelCase';

export const ShowLocation = () => {
  const { category, product } = useParams();
  const pathname = camelCase(useLocation().pathname.slice(1));

  return (
    <div className={styles.showLocationBlock}>
      <Icon icon={Home} path="/" />
      {product ? (
        <>
          <img src={arrowRight} alt="arrowRight" />
          <Link
            to={`/catalog/${category}`}
            className={styles.link}
          >
            {camelCase(category)}
          </Link>
        </>
      ) : (
        <>
          <img src={arrowRight} alt="arrowRight" />
          <p>{camelCase(category) || pathname}</p>
        </>
      )}

      {product && (
        <>
          <img src={arrowRight} alt="arrowRight" />
          <p>{camelCase(product.split('-'))}</p>
        </>
      )}
    </div>
  );
};
