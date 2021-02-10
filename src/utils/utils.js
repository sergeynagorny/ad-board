export const getFormattedPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `&thinsp;`);
};

export const getMergedAddress = (...address) => {
  return address.join(`, `);
};

export const getFilteredEntries = (obj) => {
  return Object.entries(obj).filter(([_, value]) => value !== null);
};
