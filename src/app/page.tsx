// "use client";

import styles from "./page.module.css";
import CN from "classnames";
import Navigation from "@/components/navigation/Navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Playerbar from "@/components/playerbar/Playerbar";
import { Search } from "@/components/centerblock/search/Search";
import { Playlist } from "@/components/centerblock/playlist/Playlist";
import { getTracksAll } from "@/api/tracks";
import { TrackType } from "@/Types/track";
import { Filter } from "@/components/filter/Filter";
// import { useEffect, useState } from "react";
import { setCurrentTrack } from "@/store/features/trackSlice";
import { useAppSelector } from "@/store/store";


  // export default function Home() {
  // const [track, setTrack] = useState<TrackType>();
  // const [tracks, setTracks] = useState<TrackType[]>([]);
  // const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  // getTracksAll()
  // .then((response) => {
  // setTracks(response);
  // })
  // .catch((error) => {
  // setErrorMessage(error);
  // });
  // }, []);

export default async function Home() {

  let tracks: TrackType[] = [];
  let errorMessage = "";

  try {
    tracks = await getTracksAll();
  } catch (error: unknown) {
    errorMessage = error instanceof Error
    ? "Ошибка загрузки треков: " + error.message
    : "Неизвестная ошибка";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {errorMessage ? (
          <div className={styles.error}>{errorMessage}</div>
        ) : (
          <main className={styles.main}>
            <Navigation />
            <div className={CN(styles.mainCenterblock, styles.centerblock)}>
              <Search />
              <Filter tracks={tracks} />
              {/* <Playlist tracks={tracks} setTrack={setTrack} /> */}
              <Playlist tracks={tracks} />
            </div>
            <Sidebar />
          </main>
        )}
        {/* {track && <Playerbar track={track} />} */}
        <Playerbar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
