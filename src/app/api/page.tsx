"use server"

const pathMusic = "https://webdev-music-003b5b991590.herokuapp.com/";
const pathLogin = pathMusic + "user/login/";
const pathTrackAll = pathMusic + "catalog/track/all/";
const pathReg = "https://webdev-music-003b5b991590.herokuapp.com/user/signup/";

export async function loginUser(email: string, password: string) {
    const response = await fetch(pathLogin + "/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
        "content-type": "application/json",
      },
    });
    if (!response.ok && (response.status === 400)) {
      throw new Error("Неверный логин или пароль");
    } else if (!response.ok && (response.status === 500)) {
      throw new Error("Ошибка соединения");
    } 

    const data = await response.json();
    return data;
  }

