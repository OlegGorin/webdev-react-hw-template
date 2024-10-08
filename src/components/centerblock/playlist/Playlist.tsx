import styles from "./Playlist.module.css";
import CN from "classnames";
import { Track } from "./track/track";
import { TrackType } from "@/Types/track";
import { FC } from "react";

type PlaylistProps = {
  tracks: TrackType[];
};

export const Playlist: FC<PlaylistProps> = ({ tracks }) => {
  return (
    <div className={CN(styles.centerblockContent, styles.playlistContent)}>
      <div className={CN(styles.contentTitle, styles.playlistTitle)}>
        <div className={CN(styles.playlistTitleCol, styles.col01)}>Трек</div>
        <div className={CN(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={CN(styles.playlistTitleCol, styles.col03)}>Альбом</div>
        <div className={CN(styles.playlistTitleCol, styles.col04t)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={CN(styles.contentPlaylist, styles.playlist)}>
        {tracks.map((track) => (
          <Track track={track} key={track._id} tracks={tracks} />
        ))}
      </div>
    </div>
  );
};
