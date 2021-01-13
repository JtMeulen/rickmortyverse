const initialState = {
  username: '',
  auth: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGGED_IN':
      return {
        ...state,
        username: action.username,
        auth: true
      }
    case 'LOGGED_OUT':
      return {
        ...state,
        username: '',
        auth: false
      };
    default:
      return state;
  }
}

export default reducer;
