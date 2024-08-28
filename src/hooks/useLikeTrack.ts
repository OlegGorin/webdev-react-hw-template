import { addLikeTrack, removeLikeTrack } from "@/api/tracks";
import {
  setDislike,
  setLike,
} from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrackType } from "@/Types/track";

export const useLikeTrack = (track: TrackType) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);
  const user = useAppSelector((state) => state.user.user);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  const isLiked = !!likedTracks.find((t) => t._id === track._id);

  const handleLike = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (!tokens || !user) {
      alert("Нет авторизации");
      return;
    }

    const fetchAction = isLiked ? removeLikeTrack : addLikeTrack;
    const storeAction = isLiked ? setDislike : setLike;

    try {
      await fetchAction(tokens.access, track._id);
      dispatch(storeAction(track));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLiked,
    handleLike,
  };
};
