import { getFavoriteTracks } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

export const useInitLikedTracks = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens?.access) {
      dispatch(getFavoriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
};
