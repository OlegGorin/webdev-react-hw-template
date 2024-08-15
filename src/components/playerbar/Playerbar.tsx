"use client";

import styles from "./Playerbar.module.css";
import CN from "classnames";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./progressbar/ProgressBar";
import { Volume } from "./volume/volume";
import { FormatTime } from "@/utils/FormatTime";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setIsPlaying,
  setIsShuffle,
  setIsLooping,
  setNextTrack,
  setPrevTrack,
  setIsEndPlaying,
} from "@/store/features/trackSlice";
import { useLikeTrack } from "@/hooks/useLikeTrack";

export default function Playerbar() {
  // Использование useRef для получения доступа к элементу <audio>
  const audioRef = useRef<HTMLAudioElement>(null);

  // Начальное текущее время воспроизведения устанавливаем в 0
  const DEFAULT_CURRENT_TIME = 0;
  const [currentTime, setCurrentTime] = useState(DEFAULT_CURRENT_TIME);

  // Начальная громкость установлена на 50%
  const DEFAULT_VOLUME = 0.5;
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  // Продолжительность трека в секундах
  const duration = audioRef.current?.duration || 0;
  const {
    currentTrack: track,
    isPlaying,
    isShuffle,
    isLooping,
    isEndPlaying,
  } = useAppSelector((state) => state.playlist);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  const { isLiked, handleLike } = useLikeTrack(currentTrack!);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlaying(true));
      dispatch(setIsEndPlaying(false));
    }
  }, [track, dispatch]);

  useEffect(() => {
    const handleEnded = () => {
      dispatch(setNextTrack());
    };

    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [track, dispatch]);

  if (!track) {
    return <></>;
  }

  // Функция для воспроизведения и паузы
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
        dispatch(setIsLooping(false));
      } else {
        audioRef.current.loop = true;
        dispatch(setIsLooping(true));
      }
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handlePrevTrack = () => {
    if (isEndPlaying) {
      dispatch(setIsEndPlaying(false));
    }
    dispatch(setPrevTrack());
  };

  const handleNextTrack = () => {
    if (isEndPlaying) {
      dispatch(setIsEndPlaying(false));
    }
    dispatch(setNextTrack());
  };

  const handleShufflePlay = () => {
    dispatch(setIsShuffle(!isShuffle ? true : false));
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.timer}>
          {FormatTime(currentTime)} / {FormatTime(duration)}
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleProgressChange}
        />
        <div className={styles.barPlayerBlock}>
          <div className={CN(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              <audio
                ref={audioRef}
                src={track.track_file}
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
              />
              <div className={styles.playerBtnPrev} onClick={handlePrevTrack}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-prev"
                    width={15}
                    height={14}
                  ></use>
                </svg>
              </div>
              <div
                className={CN(styles.playerBtnPlay, styles._btn)}
                onClick={togglePlay}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref={
                      !isPlaying
                        ? "/img/icon/sprite.svg#icon-play"
                        : "/img/icon/sprite.svg#icon-pause"
                    }
                    width={22}
                    height={20}
                  ></use>
                </svg>
              </div>
              <div className={styles.playerBtnNext} onClick={handleNextTrack}>
                <svg className={styles.playerBtnNextSvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-next"
                    width={15}
                    height={14}
                  ></use>
                </svg>
              </div>
              <div
                className={CN(styles.playerBtnRepeat, styles._btnIcon)}
                onClick={toggleLoop}
              >
                <svg
                  className={CN(styles.playerBtnRepeatSvg, {
                    [styles.repeatActive]: isLooping,
                  })}
                >
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-repeat"
                    width={18}
                    height={12}
                  ></use>
                </svg>
              </div>
              <div
                className={CN(styles.playerBtnShuffle, styles._btnIcon)}
                onClick={handleShufflePlay}
              >
                <svg
                  className={CN(styles.playerBtnShuffleSvg, {
                    [styles.shuffleActive]: isShuffle,
                  })}
                >
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-shuffle"
                    width={19}
                    height={12}
                  ></use>
                </svg>
              </div>
            </div>

            <div className={CN(styles.playerTrackPlay, styles.trackPlay)}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use
                      xlinkHref="/img/icon/sprite.svg#icon-note"
                      width={18}
                      height={17}
                    ></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink}>{track.name}</a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink}>{track.author}</a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div className={CN(styles.trackPlayLike, styles._btnIcon)}>
                  <div onClick={handleLike}>
                    <svg className={styles.trackPlayLikeSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#icon-${
                          user ? (isLiked ? "like" : "like_") : "like_"
                        }`}
                        width={14}
                        height={12}
                      ></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Volume
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
