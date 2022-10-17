const getItems = document.querySelector('.cart__items');

// Função responsável por criar e retornar o elemento de imagem do produto.
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

// Função responsável por criar e retornar qualquer elemento.
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

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

// Função responsável por criar e retornar o elemento do produto.
// Função que recupera o ID do produto passado como parâmetro.
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

// Função responsável por criar e retornar um item do carrinho.
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItems = async () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((elemento) => elemento.addEventListener('click', async (event) => {
    const resultadoFetchItem = await fetchItem(getIdFromProductItem(event.target.parentElement));
    cartItems.appendChild(createCartItemElement(resultadoFetchItem));
  }));
};

const showItems = async () => {
  const items = document.querySelector('.items');
  const resultadoFetchProducts = await fetchProducts('computador');
  resultadoFetchProducts.results.forEach((elemento) => { 
    const item = createProductItemElement(elemento);
    items.appendChild(item);
  });
};

// Esvaziar carrinho de compras
const emptyCart = document.querySelector('.empty-cart');
emptyCart.addEventListener('click', () => {
  getItems.innerHTML = '';
});

window.onload = () => { 
  showItems();
  addItems();
};