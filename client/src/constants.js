// One upper case letter or symbol or number, 8 characters in length
const minimumPasswordRequirements = /^(?=.*[A-Z])|(?=.*[!@#$&*])|(?=.*[0-9]).{8}$/;

export const PASSWORD_REQUIREMENTS = {
  minimumPasswordRequirements,
  minimumPasswordLength: 8,
}

export const AUTHENTICATION_ERROR_MESSAGES = {
  invalidEmail: 'Email is invalid',
  wrongPassword: 'Password is incorrect',
  emailInUse: 'Email in use',
  passwordTooShort: 'Password is too short (minimum 8 characters)',
  missingPasswordRequirements: 'Password should contain at least one upper case character, number or symbol',
  defaultMessage: 'Email or Password is invalid',
}

export const ERROR_MESSAGES = {
  unknownError: 'We\'re sorry! Something has gone wrong, please try refreshing the page!'
}

export const DATABASE_PATHS = {
  ROOMS_PATH: 'rooms',
  ROOM_STATE_PATH: 'state',
  ROOM_DETAILS_PATH: 'details',
  WINDOW_STATE_PATH: 'windows',
  ACTION_BAR_STATE_PATH: 'action_bars',
  USERS_PATH: 'users',
}

export const SOCKET_PATHS = {
  ACTION_BAR_CHANGE: 'action-bar-change',
  ROOM_DETAILS_CHANGE: 'room-details-change',
}
