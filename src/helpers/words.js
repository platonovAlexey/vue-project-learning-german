export function getFullOriginalWord(entity) {
  let result = entity.origText;
  if (entity.origPrefix) {result = `${entity.origPrefix} ${result}`};

  return result;
}
