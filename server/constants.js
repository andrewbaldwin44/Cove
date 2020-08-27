const DATABASE_PATHS = {
  USERS_PATH: 'users',
  OWNED_ROOMS_PATH: 'ownedRooms',
  PARTICIPATING_ROOMS_PATH: 'participatingRooms',
  ROOMS_PATH: 'rooms',
  ROOMS_MEMBERS_PATH: 'members',
  ROOMS_DETAILS_PATH: 'details',
  ROOM_STATE_PATH: 'state',
  ACTION_BAR_STATE_PATH: 'action_bars'
}

const APPS = ['web', 'games', 'youtube', 'deezer', 'activity'];
const DEFAULT_BOTTOM_ACTION_BAR_LENGTH = '80%';

module.exports = {
  DATABASE_PATHS,
  APPS,
  DEFAULT_BOTTOM_ACTION_BAR_LENGTH,
};
