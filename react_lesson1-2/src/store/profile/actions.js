export const CHANGE_NAME = "PROFILE::CHANGE_NAME";
export const CHANGE_SHOW_NAME = "PROFILE::CHANGE_SHOW_NAME";
export const CHANGE_AGE = "PROFILE::CHANGE_AGE";
export const CHANGE_IS_AUTHED = "PROFILE::CHANGE_IS_AUTHED";

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

export const changeIsAuthed = (isAuthed) => ({
  type: CHANGE_IS_AUTHED,
  payload: {
    isAuthed,
  },
});
