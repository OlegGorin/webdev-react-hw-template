"use client";

import styles from "./Track.module.css";
import CN from "classnames";
import { TrackType } from "@/Types/track";
import { FormatTime } from "@/utils/FormatTime";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCurrentTrack } from "@/store/features/trackSlice";
import { useLikeTrack } from "@/hooks/useLikeTrack";

type PlaylistProps = {
  track: TrackType;
  tracks: TrackType[];
};

export function Track({ track, tracks }: PlaylistProps) {
  const { name, author, album, duration_in_seconds } = track;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { currentTrack, isPlaying, isEndPlaying } = useAppSelector(
    (state) => state.playlist
  );
  const { isLiked, handleLike } = useLikeTrack(track);

  const handleSelectTrack = () => {
    dispatch(setCurrentTrack({ currentTrack: track, playlist: tracks }));
  };

  const conditionCurrentTrack = currentTrack?._id === track._id;

  return (
    <div className={styles.playlistItem} onClick={handleSelectTrack}>
      <div className={CN(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.boxMark}>
            {conditionCurrentTrack && (
              <div
                className={CN(styles.blinkedMark, {
                  [styles.active]: isPlaying && !isEndPlaying,
                })}
              ></div>
            )}
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
          <div onClick={handleLike}>
            <svg className={styles.trackTimeSvg}>
              <use
                xlinkHref={`/img/icon/sprite.svg#icon-${
                  user ? (isLiked ? "like" : "like_") : "like_"
                }`}
              ></use>
            </svg>
          </div>
          <span className={styles.trackTimeText}>
            {FormatTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
