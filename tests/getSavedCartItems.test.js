const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('4.1 Verifica se localStorage.getItem está sendo chamado com a execução do getSavedCartItems', async () => {
    await getSavedCartItems()

    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('4.2 Verifica se localStorage.getItem é chamado com o parâmetro: cartItems', async () => {
    await getSavedCartItems()

    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
