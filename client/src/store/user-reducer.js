const initialState = {
  username: '',
  auth: false,
  favorites: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        username: action.payload.username,
        favorites: action.payload.favorites,
        auth: true
      }
    case 'LOGGED_OUT':
      return {
        ...state,
        username: '',
        favorites: [],
        auth: false
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites
      };
    default:
      return state;
  }
}

export default reducer;
