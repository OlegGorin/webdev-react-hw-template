const pathSelection =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/";

const pathTracks =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/";

const pathToken =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/";

export const getTracksAll = async () => {
  const response = await fetch(pathTracks + "all/", {
    method: "GET",
  });
  
  if (!response.ok) {
    throw new Error("Ошибка загрузки треков");
  }
  const data = await response.json();
  return data.data;
};

export const fetchFavoriteTracks = async (token: string) => {
  const response = await fetch(pathToken, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data.data;
};

export const fetchSelectionTracks = async (id: string) => {
  const response = await fetch(pathSelection + `${id}`, {
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data.data;
};

export const addLikeTrack = async (token: string, id: number) => {
  const response = await fetch(pathTracks + `${id}` + "/favorite/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data.data;
};

export const removeLikeTrack = async (token: string, id: number) => {
  const response = await fetch(pathTracks + `${id}` + "/favorite/", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data.data;
};
