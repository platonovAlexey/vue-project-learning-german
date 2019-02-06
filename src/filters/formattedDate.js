export default function formattedDate(value) {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value.toDate().toLocaleDateString();
}
