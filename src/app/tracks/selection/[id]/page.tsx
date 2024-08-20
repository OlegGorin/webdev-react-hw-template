"use client";

import { fetchSelectionTracks, getTracksAll } from "@/api/tracks";
import { TrackType } from "@/Types/track";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import { Filter } from "@/components/filter/Filter";
import { Playlist } from "@/components/centerblock/playlist/Playlist";
import { title } from "process";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const [selectionTracks, setSelectionTracks] = useState<TrackType[]>([]);
  const [selectionName, setSelectionName] = useState("");

  useEffect(() => {
    const getSelectionTracks = async () => {
      try {
        const allTracks: TrackType[] = await getTracksAll();
        const fullId = String(Number(id) + 1);
        const tracks = await fetchSelectionTracks(fullId);

        const resultTracks = allTracks.filter((track) =>
          tracks.items.includes(track._id)
        );

        setSelectionName(tracks.name);
        setSelectionTracks(resultTracks);
      } catch (error) {
        console.log(error);
      }
    };

    getSelectionTracks();
  }, [id]);
  return (
    <>
      <h2 className={styles.centerblockH2}>{selectionName}</h2>
      <Filter tracks={selectionTracks} />
      <Playlist tracks={selectionTracks} />
    </>
  )
}
