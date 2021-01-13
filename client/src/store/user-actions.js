export const loggedIn = (username) => {
  return {
    type: 'LOGGED_IN',
    username
  }
}

export const loggedOut = () => {
  return {
    type: 'LOGGED_OUT'
  }
}
