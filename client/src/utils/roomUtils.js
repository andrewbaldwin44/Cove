import { DATABASE_PATHS } from '../constants';
const {
  ROOMS_PATH,
  ROOM_STATE_PATH,
  ACTION_BAR_STATE_PATH,
} = DATABASE_PATHS;

export function getActionBars(roomID, callback, database) {
  const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                            .collection(roomID).doc(ACTION_BAR_STATE_PATH);

  reference.get().then(snapshot => {
    const data = snapshot.data();

    callback(data);
  });
}
