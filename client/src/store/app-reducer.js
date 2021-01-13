const initialState = {
  page: 1
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SWITCH_PAGE':
      return {
        ...state,
        page: action.page
      }
    default:
      return state;
  }
}

export default reducer;
