import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UsePaginationProps {
  contentPerPage: number,
  count: number,
}

interface UsePaginationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

type UsePagination = (arg0: UsePaginationProps) => (UsePaginationReturn);

export const usePagination: UsePagination = ({ contentPerPage, count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+(searchParams.get('page') || 1));
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if ((direction && state < pageCount) || (!direction && state > 1)) {
        return direction ? state + 1 : state - 1;
      }

      return state;
    });
  };

  const setPageSafe = (num: number) => {
    setPage(Math.min(Math.max(num, 1), pageCount));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());
    setSearchParams(params);
  }, [page]);

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSafe,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
