"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Signin.module.css";
import CN from "classnames";
import { useAppDispatch } from "@/store/store";
import { getToken, getUser } from "@/store/features/userSlice";

export function SigninPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const [error, setError] = useState("");
  const [logError, setLogError] = useState(false);
  const [passError, setPassError] = useState(false);

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setLogError(false);
    setPassError(false);
  };

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!formValues.email || formValues.email.trim() === "") {
      setError("Не введена почта");
      setLogError(true);
      return;
    }

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(String(formValues.email).toLowerCase())) {
      setError("Некорректный email");
      return;
    }

    if (!formValues.password || formValues.password.trim() === "") {
      setError("Не введен пароль");
      setPassError(true);
      return;
    } else if (formValues.password.trim().length < 6) {
      setError("Пароль не должен быть короче 6 символов");
      return;
    }

    try {
      await Promise.all([
        dispatch(getUser(formValues)).unwrap(),
        dispatch(getToken(formValues)).unwrap(),
      ]);
      setError("");
      setLogError(false);
      setPassError(false);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [formValues.email, formValues.password]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
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
              type="email"
              name="email"
              placeholder="Почта"
              pattern="^\S+@\S+\.\S+$"
              value={formValues.email}
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
            {error && <p className={styles.error}>{error}</p>}
            <button
              className={`${
                !error ? styles.modalBtnEnter : styles.modalBtnEnterError
              }`}
              onClick={onLogin}
              type="submit"
            >
              <Link href="#">Войти</Link>
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
