"use client";

import styles from "./FilterItems.module.css";
import classNames from "classnames";
import { TrackType } from "@/Types/track";
import { FC, useState } from "react";

type FilterItemProps = {
  title: string;
  isActive: boolean;
  list: string[];
  handleFilter: (newFilter: string) => void;
};
export const FilterItem: FC<FilterItemProps> = ({
  title,
  isActive,
  list,
  handleFilter,
}) => {
  const CN = require("classnames");
  return (
    <>
      <div className={styles.wrapper}>
        <div
          onClick={() => handleFilter(title)}
          className={CN(styles.filterButton, `${!isActive ? styles._btnText : styles._btnTextActive}`)}
        >
          {title}
        </div>
        {isActive && (
          <div className={styles.container}>
            <ul className={styles.filterBox}>
              <div className={styles.innerBox}>
                {list.map((item, index) => (
                  <li key={index} className={styles.itemList}>
                    <p>{item}</p>
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
