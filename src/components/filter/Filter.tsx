"use client";

import Image from "next/image";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { TrackType } from "@/Types/track";
import { FC, useState } from "react";
import { FilterItem } from "./filterItem/FilterItem";
import { getUniqueValues } from "../utils/getUniqueValues";

type FilterProps = {
  tracks: TrackType[];
};

const SORT_ORDER = ["По умолчанию", "Сначала новые", "Сначала старые"];

export const Filter: FC<FilterProps> = ({ tracks }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = (filterName: string) => {
    setActiveFilter((prevState) =>
      prevState === filterName ? null : filterName
    );
  };

  const getFilterAuthor = getUniqueValues(tracks, "author");
  const getFilterGenre = getUniqueValues(tracks, "genre");

  const filterParts = [
    {
      title: "исполнителю",
      list: getFilterAuthor,
    },
    {
      title: "году выпуска",
      list: SORT_ORDER,
    },
    {
      title: "жанру",
      list: getFilterGenre,
    },
  ];

  const CN = require("classnames");
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
            list={filterPart.list}
          />
        ))}
      </div>
    </div>
  );
};
