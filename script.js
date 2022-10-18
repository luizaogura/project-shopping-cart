const getItems = document.querySelector('.cart__items');

 /**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
 const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// Adicione um texto de carregando durante uma requisição à API
const pageLoading = () => {
  const text = document.createElement('p');
  text.innerText = 'carregando...';
  text.className = 'loading';
  document.querySelector('.items').appendChild(text);
};

// função para retirá-lo
const pageLoaded = () =>
  document
    .querySelector('.items')
    .removeChild(document.querySelector('.loading'));

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// Remova o item do carrinho de compras ao clicar nele
const cartItemClickListener = (e) => {
  e.target.remove();
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItems = async () => {
  const items = document.querySelector('.items');
  const resultadoFetchProducts = await fetchProducts('computador');
  resultadoFetchProducts.results.forEach((elemento) => { 
    const item = createProductItemElement(elemento);
    items.appendChild(item);
  });
};

const addItemsToShoppingCart = async () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((elemento) => elemento.addEventListener('click', async (event) => {
    const resultadoFetchItem = await fetchItem(getIdFromProductItem(event.target.parentElement));
    getItems.appendChild(createCartItemElement(resultadoFetchItem));
  }));
};

// Salve os itens adicionados no carrinho de compras no localStorage
function saveItemsToLocalStorage() {
  if (localStorage.length !== 0) {
    const getLocalStorage = getSavedCartItems();
    const objItem = JSON.parse(getLocalStorage);
    objItem.forEach((element) => {
      createCartItemElement(element);
    });
  }
}

// Esvaziar carrinho de compras
const emptyCart = document.querySelector('.empty-cart');
emptyCart.addEventListener('click', () => {
  getItems.innerHTML = '';
});

window.onload = async () => { 
  pageLoading();
  pageLoaded();
  await addItems();
  await addItemsToShoppingCart();
  saveItemsToLocalStorage();
 };