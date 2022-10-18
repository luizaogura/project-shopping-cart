const fetchItem = async (ItemID) => {
  const responseFetch = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const data = await responseFetch.json();
  return data;
 };
 
 if (typeof module !== 'undefined') {
   module.exports = {
     fetchItem,
   };
 }