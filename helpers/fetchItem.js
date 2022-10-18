const fetchItem = async (itemId) => {
  const responseFetch = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  const data = await responseFetch.json();
  return data;
 };
 
 if (typeof module !== 'undefined') {
   module.exports = {
     fetchItem,
   };
 }