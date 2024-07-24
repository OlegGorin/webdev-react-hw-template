const pathTracks =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/";

export const getTracksAll = async () => {
  const response = await fetch(pathTracks + "all/", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Ошибка загрузки трэков");
  }

  const data = await response.json();
  return data.data;
};
