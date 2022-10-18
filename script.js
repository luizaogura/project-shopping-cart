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

// Adicione um texto de carregando durante uma requisição à API


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
  const response = await fetchProducts('computador');
  const section = document.querySelector('.items');
  response.results.forEach((product) => {
    const item = createProductItemElement(product);
    item.className = 'item';
    section.appendChild(item);
  });
};

const addItemsToShoppingCart = async () => {
  const cartItems = document.querySelector('.cart__items');
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((botton) => botton.addEventListener('click', async (event) => {
    const response = await fetchItem(getIdFromProductItem(event.target.parentElement));
    cartItems.appendChild(createCartItemElement(response));
    arrayProducts.push(event.target.parentElement.innerText);
    handlerLocalStorage();
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
  await addItems();
  await addItemsToShoppingCart();
  saveItemsToLocalStorage();
 };