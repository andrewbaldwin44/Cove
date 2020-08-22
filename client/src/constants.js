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

export const DATABASE_PATHS = {
  ROOMS_PATH: 'rooms',
  ROOM_STATE_PATH: 'state',
  WINDOW_STATE_PATH: 'windows',
}
