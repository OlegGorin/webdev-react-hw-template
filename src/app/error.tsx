"use client";

import { ErrorType } from "@/Types/error";
import CN from "classnames";
import { useEffect } from "react";
import styles from "./error.module.css";
import Image from "next/image";

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.letter}>
        <div className={styles.error}>
          <p className={styles.smileText}>Ошибка загрузки!</p>
        </div>
        <div className={styles.action}>
          <p>Проверьте подключение к сети и повторите попытку</p>
        </div>
      </div>
      <Image
        className={styles.sidebarImg}
        priority
        src="/img/smile_sad.png"
        alt="smile sad"
        width={120}
        height={120}
      />

      <button
        className={CN(styles.errorButton, styles.btnText)}
        onClick={() => reset}
      >
        Попробуйте снова
      </button>
    </div>
  );
}
