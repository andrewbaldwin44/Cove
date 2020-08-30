const DATABASE_PATHS = {
  USERS_PATH: 'users',
  OWNED_ROOMS_PATH: 'ownedRooms',
  PARTICIPATING_ROOMS_PATH: 'participatingRooms',
  ROOMS_PATH: 'rooms',
  ROOMS_MEMBERS_PATH: 'members',
  ROOMS_DETAILS_PATH: 'details',
  ROOM_STATE_PATH: 'state',
  ROOM_INVITES_PATH: 'invites',
  ACTION_BAR_STATE_PATH: 'action_bars',
}

const SOCKET_PATHS = {
  SEND_ACTION_BAR: 'send-action-bar',
  SEND_ROOM_DETAILS: 'send-room-details',
  SEND_WINDOW_STATE: 'send-window-state',
  SEND_ACTIVITY_CARDS: 'send-activity-cards',
  RECEIVE_ACTION_BAR: 'receive-action-bar',
  RECEIVE_ROOM_DETAILS: 'receive-room-details',
  RECEIVE_WINDOW_STATE: 'receive-window-state',
}

const APPS = ['web', 'games', 'youtube', 'deezer', 'activity'];
const DEFAULT_BOTTOM_ACTION_BAR_LENGTH = '80%';

module.exports = {
  DATABASE_PATHS,
  APPS,
  DEFAULT_BOTTOM_ACTION_BAR_LENGTH,
  SOCKET_PATHS
};
