const fetchProducts = async (busca) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${busca}`;
    const request = await fetch(url);
    const results = await request.json();
    return results;
} catch (error) {
  throw new Error('You must provide an url');
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

console.log(fetchProducts('computador'));