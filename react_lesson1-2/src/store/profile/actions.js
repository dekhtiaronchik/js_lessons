export const CHANGE_NAME = "PROFILE::CHANGE_NAME";
export const CHANGE_SHOW_NAME = "PROFILE::CHANGE_SHOW_NAME";
export const CHANGE_AGE = "PROFILE::CHANGE_AGE";
export const CHANGE_IS_AUTHENTICATED = "PROFILE::CHANGE_IS_AUTHENTICATED";

export const changeName = (name) => ({
  type: CHANGE_NAME,
  payload: {
    name,
  },
});

export const changeAge = (age) => ({
  type: CHANGE_AGE,
  payload: {
    age,
  },
});

export const changeShowName = () => ({
  type: CHANGE_SHOW_NAME,
});

export const changeIsAuthenticated = (isAuthenticated) => ({
  type: CHANGE_IS_AUTHENTICATED,
  payload: {
    isAuthenticated,
  },
});
