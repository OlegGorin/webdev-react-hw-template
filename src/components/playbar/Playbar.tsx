"use client";

import { useAppSelector } from "@/store/store";
import Playerbar from "../playerbar/Playerbar";

export default function Playbar() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  return <>{currentTrack && <Playerbar />}</>;
}
