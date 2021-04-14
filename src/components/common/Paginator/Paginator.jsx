import { useState } from "react";
import s from "./Paginator.module.css";
import cn from "classnames";

const Paginator = ({
  totalItemsCount,
  pageCount,
  currentPage,
  onPageChange,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageCount);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionsCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftSidePageNumber = (portionNumber - 1) * portionSize + 1;
  let rightSidePageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          prev
        </button>
      )}
      {pages
        .filter((p) => {
          return p >= leftSidePageNumber && p <= rightSidePageNumber;
        })
        .map((p) => {
          return (
            <span
              key={p}
              onClick={() => onPageChange(p)}
              className={cn({ [s.selectedPage]: currentPage === p }, s.page)}
            >
              {p}
            </span>
          );
        })}
      {portionNumber < portionsCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
