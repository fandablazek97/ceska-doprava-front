export function sortByClosestDatumOd(arr) {
  const currentDate = new Date();

  return arr.sort((a, b) => {
    // Extract the closest datumOd for both a and b
    const closestA = findClosestDate(a.attributes.terminACena, currentDate);
    const closestB = findClosestDate(b.attributes.terminACena, currentDate);

    // Compare the closest dates
    return closestA - closestB;
  });
}

function findClosestDate(terminACena, currentDate) {
  if (!Array.isArray(terminACena) || terminACena.length === 0) {
    return Infinity; // No valid dates; treat as very far
  }

  // Find the closest datumOd in the terminACena array
  return terminACena.reduce((closest, item) => {
    const datumOd = new Date(item.datumOd);
    return Math.abs(datumOd - currentDate) < Math.abs(closest - currentDate)
      ? datumOd
      : closest;
  }, Infinity);
}
