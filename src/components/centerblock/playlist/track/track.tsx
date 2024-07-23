import Image from "next/image";
import styles from "./Track.module.css";
import classNames from "classnames";
import { TrackType } from "@/Types/track";

type PlaylistProps = {
  track: TrackType;
}
export function Track({ track }: PlaylistProps) {
  const { name, author, album, duration_in_seconds } = track;

  const minutes = Math.floor(duration_in_seconds / 60);
  // const minutesString = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  const minutesString = minutes.toString();
  const seconds = duration_in_seconds % 60;
  const secondsString = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

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
            {name} <span className={styles.trackTitleSpan}></span>
          </a>
        </div>
      </div>
      <div className={styles.trackAuthor}>
        <a className={styles.trackAuthorLink} href="http://">
          {author}
        </a>
      </div>
      <div className={styles.trackAlbum}>
        <a className={styles.trackAlbumLink} href="http://">
          {album}
        </a>
      </div>
      <div className={styles.trackTime}>
        <svg className={styles.trackTimeSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span className={styles.trackTimeText}>
          <span>
            {minutesString}
          </span>
          :
          <span>
            {secondsString}
          </span>
        </span>
      </div>
    </div>
  </div>
  );
}
