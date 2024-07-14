import Image from "next/image";
import styles from "./Playerbar.module.css";
import classNames from "classnames";

export default function Playerbar() {
  const CN = require("classnames");
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={CN(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-prev"
                    width={15}
                    height={14}
                  ></use>
                </svg>
              </div>
              <div className={CN(styles.playerBtnPlay, styles._btn)}>
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-play"
                    width={22}
                    height={20}
                  ></use>
                </svg>
              </div>
              <div className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-next"
                    width={15}
                    height={14}
                  ></use>
                </svg>
              </div>
              <div className={CN(styles.playerBtnRepeat, styles._btnIcon)}>
                <svg className={styles.playerBtnRepeatSvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-repeat"
                    width={18}
                    height={12}
                  ></use>
                </svg>
              </div>
              <div className={CN(styles.playerBtnShuffle, styles._btnIcon)}>
                <svg className={styles.playerBtnShuffleSvg}>
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
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    Ты та...
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    Баста
                  </a>
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
          <div className={CN(styles.barVolumeBlock, styles.volume)}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use
                    xlinkHref="/img/icon/sprite.svg#icon-volume"
                    width={13}
                    height={18}
                  ></use>
                </svg>
              </div>
              <div className={CN(styles.volumeProgress, styles._btn)}>
                <input
                  className={CN(styles.volumeProgressLine, styles._btn)}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
