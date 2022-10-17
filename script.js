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

// Função responsável por criar e retornar o elemento do produto.
// Função que recupera o ID do produto passado como parâmetro.
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

// Função responsável por criar e retornar um item do carrinho.
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

 async function addItems(event) {
  const getId = getIdFromProductItem(event.target.parentNode);
  const completeList = await fetchItem(getId);
  const carrinho = createCartItemElement(completeList);
  getItems.appendChild(carrinho);
}

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
    section.appendChild(button);
    button.addEventListener('click', addItems);

  return section;
};

const showItems = async () => {
  const catchFetch = await fetchProducts('computador');
  catchFetch.results.forEach((item) => {
    const catchSection = document.querySelector('.items');
    const createElementItem = createProductItemElement(item);
    catchSection.appendChild(createElementItem);
  });
};

window.onload = () => { 
  showItems();
};