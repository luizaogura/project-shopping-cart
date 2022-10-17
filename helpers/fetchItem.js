const fetchItem = (ItemID) => {
  // seu código aqui
  const url = fetch(`https://api.mercadolibre.com/items/${ItemID}`)
  .then((response) => response.json())
  .catch((error) => error);

  return url;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}