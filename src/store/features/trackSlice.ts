import { TrackType } from "@/Types/track";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: TrackType | null;
  initialPlaylist: TrackType[];
  playlist: TrackType[];
  isPlaying: boolean;
  isShuffle: boolean;
  isLooping: boolean;
  isEndPlaying: boolean;
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  initialPlaylist: [],
  playlist: [],
  isPlaying: false,
  isShuffle: false,
  isLooping: false,
  isEndPlaying: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ currentTrack: TrackType; playlist: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.currentTrack;
      state.initialPlaylist = action.payload.playlist;
      state.playlist = action.payload.playlist;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? [...state.initialPlaylist].sort(() => Math.random() - 0.5)
        : state.initialPlaylist;
      const currenIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      if (playlist.length - 1 === currenIndex) {
        state.isEndPlaying = true;
        return;
      }
      state.currentTrack = playlist[currenIndex + 1];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? [...state.initialPlaylist].sort(() => Math.random() - 0.5)
        : state.initialPlaylist;
      const currenIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      if (!currenIndex) {
        return;
      }
      state.currentTrack = playlist[currenIndex - 1];
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      if (state.isShuffle === false) {
        state.playlist = [...state.initialPlaylist].sort(
          () => Math.random() - 0.5
        );
      } else {
        state.playlist = state.initialPlaylist;
      }
      state.isShuffle = action.payload;
    },
    setIsLooping: (state, action: PayloadAction<boolean>) => {
      state.isLooping = action.payload;
    },
    setIsEndPlaying: (state, action: PayloadAction<boolean>) => {
      state.isEndPlaying = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsPlaying,
  setIsShuffle,
  setIsLooping,
  setIsEndPlaying,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
