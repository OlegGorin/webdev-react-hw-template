import styles from "./Playerbar.module.css";
import CN from "classnames";
import { TrackType } from "@/Types/track";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./progressbar/ProgressBar";
import { Volume } from "./volume/volume";
import { FormatTime } from "@/utils/FormatTime";

type PlayerBarProps = {
  track: TrackType;
};

export default function Playerbar({ track }: PlayerBarProps) {
  // Использование useRef для получения доступа к элементу <audio>
  const audioRef = useRef<HTMLAudioElement>(null);

 // Начальное текущее время воспроизведения устанавливаем в 0
  const DEFAULT_CURRENT_TIME = 0;
  const [currentTime, setCurrentTime] = useState(DEFAULT_CURRENT_TIME);

  // Состояние для управления воспроизведением
  const [isPlaying, setIsPlaying] = useState(false);

  // Установка воспроизведения в цикле
  const [isLooping, setIsLooping] = useState(false);

  // Начальная громкость установлена на 50%
  const DEFAULT_VOLUME = 0.5;
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  // Продолжительность трека в секундах
  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  // Функция для воспроизведения и паузы
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prevState) => !prevState);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
    }
    setIsLooping((repeat) => !repeat);
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handlePreviosPlay = () => {
    alert("Еще не реализовано");
  };

  const handleNextPlay = () => {
    alert("Еще не реализовано");
  };

  const handleShufflePlay = () => {
    alert("Еще не реализовано");
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
              <div className={styles.playerBtnPrev} onClick={handlePreviosPlay}>
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
              <div className={styles.playerBtnNext} onClick={handleNextPlay}>
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
                  className={`${
                    !isLooping
                      ? styles.playerBtnRepeatSvg
                      : styles.playerBtnRepeatAct
                  }`}
                >
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-repeat"
                    width={18}
                    height={12}
                  ></use>
                </svg>
              </div>
              <div className={CN(styles.playerBtnShuffle, styles._btnIcon)}>
                <svg
                  className={styles.playerBtnShuffleSvg}
                  onClick={handleShufflePlay}
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
                  <svg className={styles.trackPlayLikeSvg}>
                    <use
                      xlinkHref="/img/icon/sprite.svg#icon-like"
                      width={14}
                      height={12}
                    ></use>
                  </svg>
                </div>
                <div className={CN(styles.trackPlayDislike, styles._btnIcon)}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use
                      xlinkHref="img/icon/sprite.svg#icon-dislike"
                      width={14.34}
                      height={13}
                    ></use>
                  </svg>
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
export type ProgressBarProps = {
  max: number;
  value: number;
  step: number;
  onChange: () => void;
};
