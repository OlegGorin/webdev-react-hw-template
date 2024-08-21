const pathLogin = "https://webdev-music-003b5b991590.herokuapp.com/user/login/";
const pathToken = "https://webdev-music-003b5b991590.herokuapp.com/user/token/";
const pathRegistration =
  "https://webdev-music-003b5b991590.herokuapp.com/user/signup/";

import { SigninType, SignupType } from "@/Types/sign";

export const fetchUser = async ({ 
  email,
  password,
}: SigninType) => {
  const response = await fetch(pathLogin, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 401) {
    throw new Error("Неверный логин или пароль");
  } else if (!response.ok && response.status === 400) {
    throw new Error("Запрос составлен некорректно");
  } else if (!response.ok && response.status === 412) {
    throw new Error("Данные в неверном формате");
  } else if (!response.ok && response.status === 500) {
    throw new Error("Ошибка соединения");
  }
  const data = await response.json();
  return data;
};

export const fetchRegistration = async ({
  email,
  password,
  username,
}: SignupType) => {
  const response = await fetch(pathRegistration, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 403) {
    throw new Error("Введенный email уже занят");
  } else if (!response.ok && response.status === 500) {
    throw new Error("Ошибка соединения");
  }
  const data = await response.json();
  return data;
};

export const fetchToken = async ({ email, password }: SigninType) => {
  const response = await fetch(pathToken, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 401) {
    throw new Error("Неверный логин или пароль");
  } else if (!response.ok && response.status === 400) {
    throw new Error("Запрос составлен некорректно");
  } else if (!response.ok && response.status === 500) {
    throw new Error("Ошибка соединения");
  }
  const data = await response.json();
  return data;
};

export const refreshToken = async (refresh: string) => {
  const response = await fetch(pathToken + "refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 400) {
    throw new Error("В теле запроса не передан refresh токен");
  } else if (!response.ok && response.status === 401) {
    throw new Error("Токен недействителен или просрочен");
  } else if (!response.ok && response.status === 500) {
    throw new Error("Ошибка соединения");
  }
  const data = await response.json();
  return data;
};
