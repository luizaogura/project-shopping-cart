const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', async () => {
    expect.assertions(1)
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Teste se é chamado com dois parâmetros', async () => {
    expect.assertions(1)
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });
});
