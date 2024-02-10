import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from 'react-use-media-query-ts';
import styles from './Footer.module.scss';

import logo from '../../img/icons/Logo.svg';
import arrowUp from '../../img/icons/ArrowUp.svg';

import { Icon } from '../Icon/Icon';

export const Footer = () => {
  const btnRef = useRef<null | HTMLDivElement>(null);
  const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const isMobile = useMediaQuery('(max-width: 658px)');

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.display = 'none';
    }

    const scrollListener = () => {
      if (btnRef.current) {
        btnRef.current.style.display = 'block';
      }

      if (btnRef.current && window.scrollY < 300) {
        btnRef.current.style.display = 'none';
      }
    };

    if (isMobile) {
      document.addEventListener('scroll', scrollListener);
    }

    return () => {
      document.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <Icon path="/" icon={logo} alt="logo" />
      <ul className={`${styles.links} + uppercase`}>
        <li>
          <Link to="https://github.com/Ssviatt/react_phone-catalog">
            github
          </Link>
        </li>
        <li><Link to="https://t.me/ssviatt">contacts</Link></li>
        <li><Link to="/">rights</Link></li>
      </ul>

      {!isMobile ? (
        <button
          type="button"
          className={`${styles.backBtn} + smallText`}
          onClick={scrollToTop}
        >
          Back to top
          <Icon icon={arrowUp} alt="arrowUp" />
        </button>
      ) : (
        <div ref={btnRef}>
          <Icon
            stylesName={styles.backBtn}
            icon={arrowUp}
            alt="arrowUp"
            onClick={scrollToTop}
          />
        </div>
      )}
    </footer>
  );
};
