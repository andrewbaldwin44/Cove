export const postRequestHeaders = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}

export function sendUserData(userData) {
  return fetch('/users/login', {
    ...postRequestHeaders,
    body: JSON.stringify(userData),
  });
}

export function validateRoomMember(idToken, roomID) {
  return fetch('/users/rooms/validate_member', {
    ...postRequestHeaders,
    body: JSON.stringify({ idToken, roomID }),
  })
    .then(response => response.json())
}

export function getRoomDetails(userRooms) {
  return fetch('/users/rooms/details', {
    ...postRequestHeaders,
    body: JSON.stringify({ userRooms }),
  })
    .then(response => response.json());
}
