import { fetchFavoriteTracks } from "@/api/tracks";
import { TrackType } from "@/Types/track";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { release } from "os";

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
  initialTracks: TrackType[];
  playlist: TrackType[];
  isPlaying: boolean;
  isShuffle: boolean;
  isLooping: boolean;
  isEndPlaying: boolean;
  likedTracks: TrackType[];
  filteredTracks: TrackType[];
  filterProps: {
    author: string[];
    genre: string[];
    order: string;
    searchString: string;
  };
};

export const initialState: PlaylistStateType = {
  currentTrack: null,
  initialPlaylist: [],
  initialTracks: [],
  playlist: [],
  isPlaying: false,
  isShuffle: false,
  isLooping: false,
  isEndPlaying: false,
  likedTracks: [],
  filteredTracks: [],
  filterProps: {
    author: [],
    genre: [],
    order: "",
    searchString: "",
  },
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ initialTracks: TrackType[] }>
    ) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
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
    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        genre?: string[];
        order?: string;
        searchString?: string;
      }>
    ) => {
      state.filterProps = {
        author: action.payload.author ?? state.filterProps.author,
        genre: action.payload.genre ?? state.filterProps.genre,
        order: action.payload.order ?? state.filterProps.order,
        searchString:
          typeof action.payload.searchString === "string"
            ? action.payload.searchString
            : state.filterProps.searchString,
      };
      state.filteredTracks = state.initialTracks.filter((track) => {
        const filterAuthor = state.filterProps.author.length !== 0
          ? state.filterProps.author.includes(track.author)
          : true;

        const filterGenre = state.filterProps.genre.length !== 0
          ? state.filterProps.genre.join().includes(track.genre)
          : true;

        const valueSearchString =
          track.name
            .toLowerCase()
            .includes(state.filterProps?.searchString.toLowerCase()) ||
          track.author
            .toLowerCase()
            .includes(state.filterProps?.searchString.toLowerCase());
        console.log("valueSearcSting: ", valueSearchString);

        return filterAuthor && filterGenre && valueSearchString;
      });
      if (state.filterProps.order === "Сначала новые") {
        state.filteredTracks.sort(
          (
            a: { release_date: string | Date | number },
            b: { release_date: string | Date | number }
          ) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
      } else if (state.filterProps.order === "Сначала старые") {
        state.filteredTracks.sort(
          (
            a: { release_date: string | Date | number },
            b: { release_date: string | Date | number }
          ) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
      } else state.filteredTracks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteTracks.fulfilled, (state, action) => {
        state.likedTracks = action.payload;
      })
      .addCase(getFavoriteTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message); // Выводим сообщение об ошибке в консоль
      });
  },
});

export const {
  setInitialTracks,
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsPlaying,
  setIsShuffle,
  setIsLooping,
  setIsEndPlaying,
  setLike,
  setDislike,
  setFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
