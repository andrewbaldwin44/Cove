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

export function requestInvite(roomID, type) {
  fetch('/users/rooms/invite_members', {
    ...postRequestHeaders,
    body: JSON.stringify({ roomID, type })
  })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function validateInvitation(email, inviteID, roomID) {
  return fetch('/users/rooms/validate_invite', {
    ...postRequestHeaders,
    body: JSON.stringify({ email, inviteID, roomID })
  })
    .then(response => response.json());
}

export function getDeezerSearch(search, deezerID, userID) {
  return fetch('/api/deezer_search', {
    ...postRequestHeaders,
    body: JSON.stringify({  search, deezerID, userID })
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export function createLoginLink(redirect, inviteID, type) {
  let query = '?'

  if (redirect) query += `redirect=${redirect}&`;
  if (inviteID) query += `id=${inviteID}`;

  return `/users/${type}/${query}`;
}
