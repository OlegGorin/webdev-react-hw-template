"use client";

import { Playlist } from "@/components/centerblock/playlist/Playlist";
import { useAppSelector } from "@/store/store";
import styles from "../page.module.css";
import { Filter } from "@/components/filter/Filter";

export default function FavoritePage() {
  const favoriteTracks = useAppSelector((state) => state.playlist.likedTracks);

  return (
    <>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <Filter tracks={favoriteTracks} />
      <Playlist tracks={favoriteTracks} />
    </>
  );
}
