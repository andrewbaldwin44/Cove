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
  WIDGET_STATE_PATH: 'widgets',
  ACTION_BAR_STATE_PATH: 'action_bars',
  USERS_PATH: 'users',
}

export const SOCKET_PATHS = {
  SEND_ACTION_BAR: 'send-action-bar',
  SEND_ROOM_DETAILS: 'send-room-details',
  SEND_WINDOW_STATE: 'send-window-state',
  SEND_WIDGET_STATE: 'send-widget-state',
  SEND_ACTIVITY_CARDS: 'send-activity-cards',
  SEND_NOTE: 'send-note',
  SEND_URL: 'send-url',
  RECEIVE_ACTION_BAR: 'receive-action-bar',
  RECEIVE_ROOM_DETAILS: 'receive-room-details',
  RECEIVE_WINDOW_STATE: 'receive-window-state',
  RECEIVE_WIDGET_STATE: 'receive-widget-state',
  RECEIVE_NOTE: 'receive-note',
  RECEIVE_URL: 'receive-url',
}

export const BASE_URL = 'http://localhost:3000';
