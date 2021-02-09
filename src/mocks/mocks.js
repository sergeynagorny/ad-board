function getRandomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const getRandomItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

// const getPriceWithSpace = (price) => {
//   return String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `);
// };

const getRandomPrice = () => {
  return Number(`${getRandomInteger(0, 100)}000`);
};


const filterByCategory = {
  "Автомобиль": function () {
    return ({
      productionYear: getRandomInteger(1960, 2020),
      transmission: getRandomItem([null, `any`, `mechanic`, `auto`]),
      bodyType: getRandomItem([null, `sedan`, `universal`, `suv`, `hatchback`, `coupe`]),
    });
  },

  "Ноутбук": function () {
    return ({
      type: getRandomItem([null, `ultrabook`, `home`, `gaming`]),
      ramValue: getRandomItem([null, `4`, `8`, `16`]),
      screenSize: getRandomItem([null, `13`, `14`, `15`, `17`]),
      cpuType: getRandomItem([null, `i3`, `i5`, `i7`]),
    });
  },

  "Недвижимость": function () {
    return ({
      type: getRandomItem([null, `flat`, `apartment`, `house`]),
      area: getRandomInteger(20, 300),
      roomsCount: getRandomInteger(1, 7),
    });
  },

  "Фотоаппарат": function () {
    return ({
      type: getRandomItem([null, `slr`, `digital`, `mirrorless`]),
      matrixResolution: getRandomInteger(1, 15),
      supporting: getRandomItem([null, `hd`, `full-hd`, `4k`, `5k`]),
    });
  },
};

const generateMockItem = () => {
  const category = getRandomItem([`Недвижимость`, `Ноутбук`, `Фотоаппарат`, `Автомобиль`]);

  return ({
    category,
    price: getRandomPrice(),
    seller: {
      fullname: getRandomItem([`Сергей`, `Елена`, `Владимир`, `Евгений`, `Светлана`, `Михаил`]),
      rating: getRandomInteger(0, 5),
    },
    coordinates: [
      59.938784,
      30.323126,
    ],
    publishDate: new Date(2020, 6, getRandomInteger(0, 180)),
    description: `Просторная двушка в центре Питера. Без кухни, зато в историческом здании. Внизу много кафешек, поесть можно и там. Есть выход на крышу, с которой виден весь город. В собственности больше трёх лет.`,
    address: {
      city: `Санкт-Петербург`,
      street: `ул.Большая Конюшенная`,
      building: `д.19`,
    },
    photos: new Array(getRandomInteger(0, 7)).fill(`https://placeimg.com/520/340/arch`),
    filters: filterByCategory[category](),
  });
};

export const getMockData = (amount) => {
  return new Array(amount).fill({}).map(() => generateMockItem());
};


