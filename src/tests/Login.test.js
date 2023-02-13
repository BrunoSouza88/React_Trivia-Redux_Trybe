import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Cobertura de testes da tela de Login', () => {
  const emailInput = screen.getByTestId('input-gravatar-email');
  const nameInput = screen.getByTestId('input-player-name');
  const emailToTest = 'teste@teste.com';
  const nameToTest = 'Joennet Doe';
  test('Verificando se os campos aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);

    // const emailInput = screen.getByTestId('input-gravatar-email');
    // const nameInput = screen.getByTestId('input-player-name');
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

    // const emailToTest = 'teste@teste.com';
    // const nameToTest = 'Joennet Doe';

    // const emailInput = screen.getByTestId('input-gravatar-email');
    // const nameInput = screen.getByTestId('input-player-name');
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
    const rightEmail = emailToTest;
    // const rightName = 'Joennet Doe';

    // const emailInput = screen.getByTestId('input-gravatar-email');
    // const nameInput = screen.getByTestId('input-player-name');
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(nameInput, emailToTest);

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, rightEmail);
    userEvent.type(emailInput, wrongName);

    expect(playInput).toBeDisabled();
  });

  test('Verificando se botão "play" está desabilitado quando formulário vazio', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId('btn-play')).toBeDisabled();
  });

  test('Quando inserimos somente valor nome, o botão fica desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    // const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(nameInput, nameToTest);
    expect(playBtn).toBeDisabled();
  });

  test('Quando inserido somente valor de e-mail, o botão fica desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    // const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(emailInput, emailToTest);
    expect(playBtn).toBeDisabled();
  });

  test('Verificando se ao clicar no botão "Play", ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingButton = screen.getByTestId('btn-settings');

    userEvent.click(settingButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  test('Se usuario é encaminhado para pagina GAME ao clicar no botão play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    // const nameInput = screen.getByTestId('input-player-name');
    // const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByRole('button', {
      name: /play/i,
    });

    userEvent.type(nameInput, nameToTest);
    userEvent.type(emailInput, 'teste@teste.com');
    expect(playBtn).toBeEnabled();
    userEvent.click(playBtn);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    });
  });
});
