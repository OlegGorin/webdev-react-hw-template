import styles from "./Search.module.css";
import CN from "classnames";

export const Search = () => {
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
      {/* <h2 className={styles.centerblockH2}>Треки</h2> */}
    </>
  );
};
