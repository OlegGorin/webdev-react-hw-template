"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Signin.module.css";
import classNames from "classnames";
import { loginUser } from "./api/page";

// export default async function Signin() {
export default function Signin() {  
  const CN = require("classnames");
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [logError, setLogError] = useState(false);
  const [passError, setPassError] = useState(false);

  const onInputChange = async (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setLogError(false);
    setPassError(false);
  };

  // const onLogin = async (event: any) => {
  const onLogin = (event: any) => {    
    event.preventDefault();

    if (!formValues.login || formValues.login.trim() === "") {
      setError("Не введена почта");
      setLogError(true);
      return;
    }

    if (!formValues.password || formValues.password.trim() === "") {
      setError("Не введен пароль");
      setPassError(true);
      return;
    }

    try {
      const response = loginUser(
        formValues.login,
        formValues.password
    );

      setError("");
      // setUser(response.user);
      router.push('/home');
    } catch (error) {
      console.error(error);
      if (error === "Failed to fetch") {
        setError("Ошибка соединения");
        return;
      }
      // setError(error);
      setLogError(true);
      setPassError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#" onSubmit={onLogin}>
            <Link href="../">
              <div className={styles.modalLogo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              className={CN(styles.modalInput, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
              value={formValues.login}
              onChange={onInputChange}
            />
            <input
              className={CN(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formValues.password}
              onChange={onInputChange}
            />
            <button className={styles.modalBtnEnter} type="submit">
              <Link href="/">Войти</Link>
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
