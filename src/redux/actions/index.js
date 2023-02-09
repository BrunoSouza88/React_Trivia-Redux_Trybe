// ACTIONS TYPES
export const START_GAME = 'START_GAME';

// ACTIONS CREATORS

export const startGame = (payload) => ({
  type: START_GAME,
  payload,
});

export const requestError = (error) => ({
  type: GET_ERROR,
  error,
});

export const requestTokenAPI = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};

export const fetchToken = () => async (dispatch) => {
  try {
    const data = await requestTokenAPI();
    dispatch(startGame(data));
    return data;
  } catch (error) {
    dispatch(requestError(error));
  }
};
