"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import styles from "./FilterItems.module.css";
import CN from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { SORT_ORDER } from "../filters";
import { getUniqueValues } from "@/utils/getUniqueValues";
import { setFilters } from "@/store/features/trackSlice";

type FilterItemProps = {
  title: string;
  isActive: boolean;
  value: "genre" | "author" | "order";
  handleFilter: (newFilter: string) => void;
  filterKey: string[] | string;
};
export const FilterItem: FC<FilterItemProps> = ({
  title,
  isActive,
  value,
  handleFilter,
  filterKey,
}) => {
  const tracks = useAppSelector((state) => state.playlist.initialTracks);
  const dispatch = useAppDispatch();
  const [filterCounter, setFilterCounter] = useState<number>(0);

  const filterList = useCallback(() => {
    if (value !== "order") {
      return getUniqueValues(tracks, value);
    }
    return SORT_ORDER;
  }, [tracks, value]);

  const switchFilter = useCallback((item: string) => {
    if (value !== "order" && filterKey && filterKey instanceof Array) {
      dispatch(
        setFilters({
          [value]: filterKey.includes(item)
            ? filterKey.filter((t) => t !== item)
            : [...filterKey, item],
        })
      );
    } else {
      dispatch(setFilters({ order: item }));
    }
  }, [dispatch, filterKey, value]);

  useEffect(() => {
    if (value !== "order" && filterKey) {
      setFilterCounter(filterKey.length);
    }
  }, [filterKey, value]);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          onClick={() => handleFilter(title)}
          className={CN(
            styles.filterButton,
            `${!isActive ? styles._btnText : styles._btnTextActive}`
          )}
        >
          {title}
        </div>
        {filterCounter > 0 && (
          <div className={styles.filterCounter}>{filterCounter}</div>
        )}
        {isActive && (
          <div className={styles.container}>
            <ul className={styles.filterBox}>
              <div className={styles.innerBox}>
                {filterList().map((item) => (
                  <li
                    onClick={() => switchFilter(item)}
                    key={item}
                    className={
                      filterKey.includes(item)
                        ? styles.itemListActive
                        : styles.itemList
                    }
                  >
                    {item}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
