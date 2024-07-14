import Image from "next/image";
import styles from "./Track.module.css";
import classNames from "classnames";

export default function Playlist() {
  const CN = require("classnames");
  return (
    <div className={styles.playlistItem}>
    <div className={CN(styles.playlistTrack, styles.track)}>
      <div className={styles.trackTitle}>
        <div className={styles.trackTitleImage}>
          <svg className={styles.trackTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.trackTitleText}>
          <a className={styles.trackTitleLink} href="http://">
            Guilt <span className={styles.trackTitleSpan}></span>
          </a>
        </div>
      </div>
      <div className={styles.trackAuthor}>
        <a className={styles.trackAuthorLink} href="http://">
          Nero
        </a>
      </div>
      <div className={styles.trackAlbum}>
        <a className={styles.trackAlbumLink} href="http://">
          Welcome Reality
        </a>
      </div>
      <div className={styles.trackTime}>
        <svg className={styles.trackTimeSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span className={styles.trackTimeText}>4:44</span>
      </div>
    </div>
  </div>
  );
}
