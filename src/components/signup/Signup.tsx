"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Signup.module.css";
import CN from "classnames";
import { useAppDispatch } from "@/store/store";
import { getRegistration } from "@/store/features/userSlice";

export default function Signup() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setEmailError(false);
    setPassError(false);
    setUserNameError(false);
  };

  const onRegistration = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!formValues.email || formValues.email.trim() === "") {
      setError("Не введена почта");
      setEmailError(true);
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
    }

    if (!formValues.username || formValues.username.trim() === "") {
      setError("Не введено имя пользователя");
      setUserNameError(true);
      return;
    }

    try {
      await dispatch(getRegistration(formValues)).unwrap();
      router.push("/signin");
      setError("");
      setEmailError(false);
      setPassError(false);
      setUserNameError(false);
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
      // router.push("/signup");
    }
  };

  useEffect(() => {
    setError("");
  }, [formValues.email, formValues.password, formValues.username]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </a>
            <input
              className={CN(styles.modalInput, styles.login)}
              type="email"
              name="email"
              placeholder="Почта"
              value={formValues.email}
              onChange={onInputChange}
            />
            <input
              className={CN(styles.modalInput, styles.passwordFirst)}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formValues.password}
              onChange={onInputChange}
            />
            <input
              className={CN(styles.modalInput, styles.passwordDouble)}
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formValues.username}
              onChange={onInputChange}
            />
            {error && <div className={styles.error}>{error}</div>}
            <button
              type={"submit"}
              className={`${
                !error ? styles.modalBtnSignupEnt : styles.modalBtnSignupEntErr
              }`}
              onClick={onRegistration}
            >
              <Link href={`${error ? "/signin" : "/signup"}`}>
                Зарегистрироваться
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
