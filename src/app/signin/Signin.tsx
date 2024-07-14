import Image from "next/image";
import styles from "./Signin.module.css";
import classNames from "classnames";

export default function Signin() {
  const CN = require("classnames");
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <a href="../">
              <div className={styles.modalLogo}>
                <Image src="/img/logo_modal.png" alt="logo" />
              </div>
            </a>
            <input
              className={CN(styles.modalInput, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              className={CN(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button className={styles.modalBtnEnter}>
              <a href="../index.html">Войти</a>
            </button>
            <button className={styles.modalBtnSignup}>
              <a href="signup.html">Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
