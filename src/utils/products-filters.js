import {CategoryType} from "../const";


export const getProductsPriceRange = (products) => {
  const productsPrice = products.map((product) => product.price);
  return {
    min: Math.min(...productsPrice),
    max: Math.max(...productsPrice),
  };
};

export const getProductsByCategory = (products, category) => {
  if (category === CategoryType.ALL) {
    return products;
  }

  return products.slice().filter((product) => product.category === category);
};

export const getFavoriteProducts = (products) => {
  return products.slice().filter((product) => product.isFavorite === true);
};

const checkCategory = (category, product) => {
  return category === CategoryType.ALL || product.category === category;
};

const checkPrice = (filters, product) => (
  (!filters.minPrice || product.price >= filters.minPrice) &&
  (!filters.maxPrice || product.price <= filters.maxPrice)
);

const CheckCamera = {
  type(cameraType, productType) {
    return !cameraType || cameraType.includes(productType);
  },
  matrix(matrixResolution, productMatrix) {
    return !matrixResolution || productMatrix === `-` || productMatrix >= matrixResolution;
  },
  video(videoResolution, productVideoSupporting) {
    return !videoResolution || videoResolution === `any` || videoResolution === productVideoSupporting;
  },
};

const CheckEstate = {
  type(estateTypeFilter, productType) {
    return !estateTypeFilter || estateTypeFilter.includes(productType);
  },
  square(minSquareFilter, productArea) {
    return !minSquareFilter || (productArea >= minSquareFilter);
  },
  roomsCount(roomsFilter, productRoomsCount) {
    return !roomsFilter || roomsFilter === `any` || (productRoomsCount === Number(roomsFilter)) ||
    (roomsFilter === `fivemore` && productRoomsCount >= 5);
  },
};

const CheckCar = {
  productionYear(productionYear, productProductionYear) {
    return !productionYear || (productProductionYear >= productionYear);
  },
  transmission(transmission, productTransmission) {
    return !transmission || transmission === `any` || transmission === productTransmission;
  },
  bodyType(bodyType, productBodyType) {
    return !bodyType || bodyType.includes(productBodyType);
  },
};

const CheckLaptop = {
  type(laptopType, productType) {
    return !laptopType || laptopType.includes(productType);
  },
  ram(ram, productRam) {
    return !ram || ram === `any` || productRam === `-` || (productRam >= ram);
  },
  screenSize(diagonal, productScreenSize) {
    return !diagonal || diagonal === `any` || productScreenSize === `-` || (productScreenSize >= diagonal);
  },
  cpu(processor, productCpu) {
    return !processor || processor.includes(productCpu);
  }
};


export const getFilteredProducts = (products, category, filters) => {
  return products.filter((product) => {
    if (!(checkCategory(category, product) && checkPrice(filters, product))) {
      return false;
    }

    switch (category) {
      case CategoryType.ESTATE:
        return (
          CheckEstate.type(filters[`estate-type`], product.filters[`type`]) &&
          CheckEstate.square(filters[`min-square`], product.filters[`area`]) &&
          CheckEstate.roomsCount(filters[`rooms`], product.filters[`rooms-count`])
        );
      case CategoryType.LAPTOPS:
        return (
          CheckLaptop.type(filters[`laptop-type`], product.filters[`type`]) &&
          CheckLaptop.ram(filters[`ram`], product.filters[`ram-value`]) &&
          CheckLaptop.screenSize(filters[`diagonal`], product.filters[`screen-size`]) &&
          CheckLaptop.cpu(filters[`laptop-processor`], product.filters[`cpu-type`])
        );
      case CategoryType.CAMERA:
        return (
          CheckCamera.type(filters[`camera-type`], product.filters[`type`]) &&
          CheckCamera.matrix(filters[`resolution-matrix`], product.filters[`matrix-resolution`]) &&
          CheckCamera.video(filters[`resolution-video`], product.filters[`supporting`])
        );
      case CategoryType.CARS:
        return (
          CheckCar.productionYear(filters[`production-year`], product.filters[`production-year`]) &&
          CheckCar.transmission(filters[`transmission`], product.filters[`transmission`]) &&
          CheckCar.bodyType(filters[`body-type`], product.filters[`body-type`])
        );
      default:
        return true;
    }
  });
};
