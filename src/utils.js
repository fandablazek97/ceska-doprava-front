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

export function getFridaysAndSaturdays(year) {
  const months = [5, 6, 7, 8];
  const result = [];

  for (let i = 0; i < months.length; i++) {
    const monthIndex = months[i];
    const monthData = {
      datumCr: [],
      datumHr: [],
    };

    // Get first and last days of the month
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      // Skip first week for the first month
      if (i === 0 && d.getDate() <= 7) continue;
      // Skip last week for the last month
      if (i === months.length - 1 && d.getDate() > lastDay.getDate() - 14)
        continue;

      if (d.getDay() === 5) {
        // Friday
        monthData.datumCr.push({
          datum: `${d.getDate()}.${d.getMonth() + 1}.`,
        });
      } else if (d.getDay() === 6) {
        // Saturday
        monthData.datumHr.push({
          datum: `${d.getDate()}.${d.getMonth() + 1}.`,
        });
      }
    }

    result.push(monthData);
  }

  return result;
}
