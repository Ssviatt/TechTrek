import { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import arrowLeft from '../../img/icons/ArrowLeft.svg';
import arrowRight from '../../img/icons/ArrowRight.svg';

import { Icon } from '../Icon';

type Props = {
  nextPage: () => void,
  prevPage: () => void,
  setPage: (num: number) => void,
  totalPages: number,
  page: number,
};

export const Pagination: React.FC<Props> = ({
  nextPage,
  prevPage,
  setPage,
  totalPages,
  page,
}) => {
  const visiblePages = 3;
  const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);
  const buttons = Array.from({ length: totalPages }, (_, index) => index + 1);

  // eslint-disable-next-line no-restricted-globals
  useEffect(() => scrollTo(0, 0), [page]);

  return (
    <ul className={styles.pagination} data-cy="pagination">
      <li data-cy="paginationLeft">
        <Icon
          icon={arrowLeft}
          stylesName={classNames([styles.paginationArrowLeft], {
            [styles.paginationArrowDisabled]: page === 1,
          })}
          onClick={prevPage}
        />
      </li>

      {buttons.slice(startPage - 1, endPage).map(el => (
        <Fragment key={el}>
          {startPage > 1 && el === startPage && (
            <>
              <li>
                <button
                  type="button"
                  className={classNames([styles.paginationNum], {
                    [styles.paginationNumActive]: page === 1,
                  })}
                  onClick={() => setPage(1)}
                >
                  {1}
                </button>
              </li>

              <li>
                <button type="button" disabled>...</button>
              </li>
            </>
          )}

          <li>
            <button
              type="button"
              className={classNames([styles.paginationNum], {
                [styles.paginationNumActive]: page === el,
              })}
              onClick={() => setPage(el)}
            >
              {el}
            </button>
          </li>

          {endPage < totalPages && el === endPage && (
            <>
              <li>
                <button type="button" disabled>...</button>
              </li>

              <li>
                <button
                  type="button"
                  className={classNames([styles.paginationNum], {
                    [styles.paginationNumActive]: page === totalPages,
                  })}
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>

            </>
          )}
        </Fragment>
      ))}

      <li data-cy="paginationRight">
        <Icon
          icon={arrowRight}
          stylesName={classNames([styles.paginationArrowRight], {
            [styles.paginationArrowDisabled]: page === totalPages,
          })}
          onClick={nextPage}
        />

      </li>
    </ul>
  );
};
