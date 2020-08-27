export function isContainingData(data) {
  return data && Object.keys(data).length > 0;
}

export function isEmptyData(data) {
  return data && Object.keys(data).length === 0;
}

export function toArray(object, type) {
  switch (type) {
    case 'keys':
      return Object.keys(object);
    default:
      return Object.entries(object);
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
