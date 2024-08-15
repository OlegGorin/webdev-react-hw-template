"use client";

import { Playlist } from "@/components/centerblock/playlist/Playlist";
import { useAppSelector } from "@/store/store";
import styles from "../page.module.css";

export default function FavoritePage() {
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мой плейлист</h2>
      <Playlist tracks={favoriteTracks} />
    </>
  );
}
