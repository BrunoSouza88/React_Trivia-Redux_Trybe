import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const testName = 'input-player-name';
const testEmail = 'input-gravatar-email';

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
  
  test('Verificando se o botão de "play" está desabilitado quando o formulário não estiver preenchido', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId('btn-play')).toBeDisabled();
  });

  test('Verificando se quando inserimos somente valor no campo de nome, o botão fica desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Joennet Doe');
    expect(playBtn).toBeDisabled();
  });

  test('Verficando se quando inserimos somente valor no campo de e-mail, o botão fica desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(emailInput, 'teste@teste.com');
    expect(playBtn).toBeDisabled();
  });

  test('Verificando se ao clicar no botão "Play", ', () => {
    const { history } =  renderWithRouterAndRedux(<App />);
 
     const settingButton = screen.getByTestId("btn-settings");
 
     userEvent.click(settingButton);
 
     const { pathname } = history.location;
     expect(pathname).toBe('/settings');
   });

  test('Verificando se usuario é encaminhado para a pagina GAME após clicar no botão play', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(nameInput, 'Joennet Doe');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.click(playBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  


});
