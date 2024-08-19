import styles from "./page.module.css";
import { Playlist } from "@/components/centerblock/playlist/Playlist";
import { getTracksAll } from "@/api/tracks";
import { TrackType } from "@/Types/track";
import { Filter } from "@/components/filter/Filter";

export default async function Home() {
  let tracks: TrackType[] = [];
  let errorMessage = "";

  try {
    tracks = await getTracksAll();
  } catch (error: unknown) {
    errorMessage =
      error instanceof Error
        ? "Ошибка загрузки треков: " + error.message
        : "Неизвестная ошибка";
  }

  return (
    <div>
      {errorMessage ? (
        <div className={styles.error}>{errorMessage}</div>
      ) : (
        <>
          <h2 className={styles.centerblockH2}>Треки</h2>
          <Filter tracks={tracks} />
          <Playlist tracks={tracks} />
        </>
      )}
    </div>
  );
}
