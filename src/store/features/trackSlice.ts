import { fetchFavoriteTracks } from "@/api/tracks";
import { TrackType } from "@/Types/track";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavoriteTracks = createAsyncThunk(
  "tracks/getFavorite",
  async (token: string) => {
    const response = await fetchFavoriteTracks(token);

    return response;
  }
);

type PlaylistStateType = {
  currentTrack: TrackType | null;
  initialPlaylist: TrackType[];
  playlist: TrackType[];
  isPlaying: boolean;
  isShuffle: boolean;
  isLooping: boolean;
  isEndPlaying: boolean;
  likedTracks: TrackType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  initialPlaylist: [],
  playlist: [],
  isPlaying: false,
  isShuffle: false,
  isLooping: false,
  isEndPlaying: false,
  likedTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setStartTrack: (state) => {
      const playlist = state.isShuffle
        ? [...state.initialPlaylist].sort(() => Math.random() - 0.5)
        : state.initialPlaylist;
      
      state.currentTrack = playlist[0];
    },
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
      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      if (playlist.length - 1 === currentIndex) {
        state.isEndPlaying = true;
        return;
      }
      state.currentTrack = playlist[currentIndex + 1];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? [...state.initialPlaylist].sort(() => Math.random() - 0.5)
        : state.initialPlaylist;
      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      if (!currentIndex) {
        return;
      }
      state.currentTrack = playlist[currentIndex - 1];
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
    setLike: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks.push(action.payload);
    },
    setDislike: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks = state.likedTracks.filter(
        (track) => track._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteTracks.fulfilled, (state, action) => {
      state.likedTracks = action.payload;
    })
    .addCase(getFavoriteTracks.rejected, (state, action) => {
      console.error('Error:', action.error.message); // Выводим сообщение об ошибке в консоль
    })
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
  setLike,
  setDislike,
  setStartTrack,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
