import styles from "./Search.module.css";
import classNames from "classnames";
import { TrackType } from "@/Types/track";
import { FC } from "react";

type SearchProps = {
  tracks: TrackType[];
};
export const Search: FC<SearchProps> = ({ tracks }) => {
  const CN = require("classnames");
  return (
    <>
      <div className={CN(styles.centerblockSearch, styles.search)}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblockH2}>Треки</h2>
    </>
  );
};
