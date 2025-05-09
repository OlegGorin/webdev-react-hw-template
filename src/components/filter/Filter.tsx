"use client";

import styles from "./Filter.module.css";
import { TrackType } from "@/Types/track";
import { FC, useCallback, useState } from "react";
import { FilterItem } from "./filterItem/FilterItem";
import { filterParts } from "./filters";
import { useAppSelector } from "@/store/store";

type FilterProps = {
  tracks: TrackType[];
};

export const Filter: FC<FilterProps> = ({ tracks }) => {
  const { author, genre, order } = useAppSelector(
    (store) => store.playlist.filterProps
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = useCallback((filterName: string) => {
    setActiveFilter((prevState) =>
      prevState === filterName ? null : filterName
    );
  }, []);

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <div className={styles.filter}>
        {filterParts.map((filterPart, index) => (
          <FilterItem
            key={index}
            title={filterPart.title}
            isActive={activeFilter === filterPart.title}
            handleFilter={handleFilter}
            value={filterPart.value}
            filterKey={
              filterPart.value === "author"
                ? author
                : filterPart.value === "genre"
                ? genre
                : order
            }
          />
        ))}
      </div>
    </div>
  );
};
