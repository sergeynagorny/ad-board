export const CategoryType = {
  ALL: `all`,
  ESTATE: `real-estate`,
  LAPTOPS: `laptops`,
  CAMERA: `camera`,
  CARS: `cars`,
};

export const SortType = {
  POPULAR: `popular`,
  CHEAP: `cheap`,
  NEW: `new`,
};

export const sortingButtons = [
  {
    name: SortType.POPULAR,
    title: `Популярные`,
  },
  {
    name: SortType.CHEAP,
    title: `Дешевые`,
  },
  {
    name: SortType.NEW,
    title: `Новые`,
  },
];

export const categories = [
  {
    name: CategoryType.ALL,
    title: `Все`,
  },
  {
    name: CategoryType.ESTATE,
    title: `Недвижимость`,
  },
  {
    name: CategoryType.LAPTOPS,
    title: `Ноутбуки`,
  },
  {
    name: CategoryType.CAMERA,
    title: `Фотоаппараты`,
  },
  {
    name: CategoryType.CARS,
    title: `Автомобили`,
  },
];
