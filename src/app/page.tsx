import styles from "./page.module.css";
import CN from "classnames";
import Navigation from "@/components/navigation/Navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Playerbar from "@/components/playerbar/Playerbar";
import { Search } from "@/components/centerblock/search/Search";
import { Playlist } from "@/components/centerblock/playlist/Playlist";
import { getTracksAll } from "@/app/api/tracks";
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
        ? "Возникли проблемы при загрузке треков" + error.message
        : "Неизвестная ошибка";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={CN(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <Filter tracks={tracks} />
            <Playlist tracks={tracks} />
          </div>
          <Sidebar />
        </main>
        <Playerbar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
