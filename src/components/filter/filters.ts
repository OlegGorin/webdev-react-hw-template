type FilterType = {
    title: string;
    value: "author" | "order" | "genre";
}

export const filterParts: FilterType[] = [
    {
      title: "исполнителю",
      value: "author",
    },
    {
      title: "году выпуска",
      value: "order",
    },
    {
      title: "жанру",
      value: "genre",
    },
  ];

  export const SORT_ORDER = ["По умолчанию", "Сначала новые", "Сначала старые"];