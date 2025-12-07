export const getTagColor = (tag: string): string => {
  switch (tag) {
    case "networking":
      return "text-cyan-400";
    case "datastructures":
      return "text-green-400";
    case "performance":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

// Format date for article headers (short format without time)
export const formatArticleDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
