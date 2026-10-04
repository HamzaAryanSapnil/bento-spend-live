export function getNextId(data) {
  if (!data.length) {
    return 1;
  }

  const maxId = data.reduce(
    (prev, current) => (prev > current.id ? prev : current.id),
    0,
  );

  return maxId + 1;
}
