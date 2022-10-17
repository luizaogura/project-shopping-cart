const fetchItem = async (itemID) => {
  try {
    const url = `https://api.mercadolibre.com/items/${itemID}`;
    const requisicao = await fetch(url);
    const results = await requisicao.json();
    return results;
} catch (error) {
  throw new Error('You must provide an url');
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}