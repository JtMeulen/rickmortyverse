const initialState = {
  username: '',
  auth: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        auth: true
      }
    case 'LOGOUT':
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
