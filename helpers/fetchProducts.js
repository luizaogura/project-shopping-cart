const fetchProducts = async (query) => {
  // seu código aqui
  const url = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
  .then((response) => response.json())
  .catch((error) => error);

  return url;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
