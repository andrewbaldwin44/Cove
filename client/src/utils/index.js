export function isContainingData(data) {
  return data && Object.keys(data).length > 0;
}

export function isEmptyData(data) {
  return data && Object.keys(data).length === 0;
}
