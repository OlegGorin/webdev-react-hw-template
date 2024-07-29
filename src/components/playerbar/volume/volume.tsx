import styles from "./Volume.module.css";
import CN from "classnames";

type ValueProps = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Volume = ({ value, onChange }: ValueProps) => {
  return (
    <div className={styles.barVolumeBlock}>
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
            className={styles.volumeProgressLine}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
