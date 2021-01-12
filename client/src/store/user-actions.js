export const addClick = (username) => {
  return {
    type: 'LOGIN',
    username
  }
}

export const substractClick = () => {
  return {
    type: 'LOGOUT'
  }
}
