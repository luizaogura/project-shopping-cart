const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar saveCartItems o método localStorage.setItem é chamado', async () => {
    await getSaveCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro', async () => {
    await getSaveCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
