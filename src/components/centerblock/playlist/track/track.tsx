import styles from "./Track.module.css";
import CN from "classnames";
import { TrackType } from "@/Types/track";
import { FormatTime } from "@/utils/FormatTime";

type PlaylistProps = {
  track: TrackType;
  onClick: () => void;
};
export function Track({ track, onClick }: PlaylistProps) {
  const { name, author, album, duration_in_seconds, track_file } = track;

  return (
    <div className={styles.playlistItem} onClick={onClick}>
      <div className={CN(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan}></span>
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.trackTimeText}>
            {FormatTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
