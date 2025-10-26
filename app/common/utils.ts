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
