import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Cobertura de testes da tela de Login', () => {
  test('Verificando se os campos aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });

    expect(emailInput).toBeDefined();
    expect(nameInput).toBeDefined();
    expect(playInput).toBeDefined();
    expect(playInput).toBeDisabled();
  });

  test('Verificando se botão Play é habilitado se dados corretos', () => {
    renderWithRouterAndRedux(<Login />);

    const emailToTest = 'teste@teste.com';
    const nameToTest = 'Joennet Doe';

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, emailToTest);
    userEvent.type(nameInput, nameToTest);

    expect(playInput).toBeEnabled();
  });

  test('Verificando se botão Play continua desabilitado se dados incorretos', () => {
    renderWithRouterAndRedux(<App />);

    const wrongEmail = 'teste@teste.c';
    const wrongName = '';
    const rightEmail = 'teste@teste.com';
    const rightName = 'Joennet Doe';

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(nameInput, rightName);

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, rightEmail);
    userEvent.type(emailInput, wrongName);

    expect(playInput).toBeDisabled();
  });
});
