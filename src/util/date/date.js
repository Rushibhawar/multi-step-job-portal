export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString(); // Format as "MM/DD/YYYY" or use any other format you prefer
};

export const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date; // Return null if invalid date
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} year${years !== 1 ? "s" : ""} ${months} month${
    months !== 1 ? "s" : ""
  }`;
};

export const calculateDurationFromStartDate = (startDate) => {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = new Date(); // Current date

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  };
