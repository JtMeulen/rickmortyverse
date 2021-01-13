export const loggedIn = (payload) => {
  return {
    type: 'LOGGED_IN',
    payload
  }
}

export const loggedOut = () => {
  return {
    type: 'LOGGED_OUT'
  }
}

export const setFavorites = (favorites) => {
  return {
    type: 'SET_FAVORITES',
    favorites
  }
}
