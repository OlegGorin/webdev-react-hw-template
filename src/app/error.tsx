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
      <h3 className={styles.smileText}>Что-то пошло не так!</h3>
      <Image
        className={styles.sidebarImg}
        priority
        src="/img/smile_error.png"
        alt="scary face"
        width={50}
        height={50}
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
