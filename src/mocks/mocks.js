import {adaptCategory} from "../utils/product-adapters";

function getRandomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getRandomItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomPrice = () => {
  return Number(`${getRandomInteger(0, 100)}000`);
};

const photos = [`img/item1.jpg`, `img/item2.jpg`, `img/item3.jpg`, `img/item4.jpg`, `img/item5.jpg`, `img/item6.jpg`];

const shuffleArray = (arr) => {
  return arr.map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
};


const filterByCategory = {
  "Автомобиль": function () {
    return ({
      "production-year": getRandomInteger(1960, 2020),
      "transmission": getRandomItem([null, `mechanic`, `auto`]),
      "body-type": getRandomItem([null, `sedan`, `universal`, `suv`, `hatchback`, `coupe`]),
    });
  },

  "Ноутбук": function () {
    return ({
      "type": getRandomItem([null, `ultrabook`, `home`, `gaming`]),
      "ram-value": getRandomItem([null, `4`, `8`, `16`]),
      "screen-size": getRandomItem([null, `13`, `14`, `15`, `17`]),
      "cpu-type": getRandomItem([null, `i3`, `i5`, `i7`]),
    });
  },

  "Недвижимость": function () {
    return ({
      "type": getRandomItem([null, `flat`, `apartment`, `house`]),
      "area": getRandomInteger(20, 300),
      "rooms-count": getRandomInteger(1, 7),
    });
  },

  "Фотоаппарат": function () {
    return ({
      "type": getRandomItem([null, `slr`, `digital`, `mirrorless`]),
      "matrix-resolution": getRandomInteger(1, 15),
      "supporting": getRandomItem([null, `hd`, `full-hd`, `4k`, `5k`]),
    });
  },
};

const generateMockItem = (index) => {
  const id = index + 1 || null;
  const category = getRandomItem([`Недвижимость`, `Ноутбук`, `Фотоаппарат`, `Автомобиль`]);
  const dateNow = new Date(Date.now());
  const publishDate = new Date(dateNow.setHours(dateNow.getHours() - getRandomInteger(2, 500)));

  return ({
    id,
    name: getRandomItem([`BMW 5 серии б/у`, `LADA (ВАЗ) 2121 (4x4)`, `MacBook Pro 13 2011 года`, `Ноутбук Asus GTX 860`, `Ультрабук Dell XPS 13`, `Фотоаппарат Sony NEX-5`]),
    category: adaptCategory(category),
    price: getRandomPrice(),
    seller: {
      fullname: getRandomItem([`Сергей`, `Елена`, `Владимир`, `Евгений`, `Светлана`, `Михаил`]),
      rating: getRandomInteger(1, 5),
    },
    coordinates: [
      59.938784,
      30.323126,
    ],
    publishDate,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    description: `Просторная двушка в центре Питера. Без кухни, зато в историческом здании. Внизу много кафешек, поесть можно и там. Есть выход на крышу, с которой виден весь город. В собственности больше трёх лет.`,
    address: {
      city: getRandomItem([`Хабаровск`, `Гродно`, `Москва`, `Минск`, `Питер`, `Варшава`]),
      street: getRandomItem([`ул. Павловича`, `ул. Поповича`, `проспект Победы`, `ул. Пархоменко`, `ул. Рябиновая`]),
      building: getRandomItem([`д. 19`, `д. 20`, `д. 19 корпус 2`, `64/25`]),
    },
    photos: shuffleArray(photos),
    filters: filterByCategory[category](),
  });
};

export const getMockData = (amount) => {
  return new Array(amount).fill({}).map((_, i) => generateMockItem(i));
};


