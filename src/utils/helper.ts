export const formatNumber = (str?: string) => {
  if (str === undefined || str === null || str === "") return "";
  const strFormat = str
    .toString()
    .replace(/[A-Za-z`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/g, "");
  if (Number(strFormat) >= 1000) {
    return strFormat
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  } else if (Number(strFormat) >= 0 && Number(strFormat) < 1000) {
    return Number(strFormat);
  } else {
    return "";
  }
};

export const removeNonNumericCharacters = (str?: string | number) => {
  if (str === undefined || str === null || str === "") return "";
  return Number(str?.toString().replace(/\D/g, ""));
};

export default {
  formatNumber,
  removeNonNumericCharacters,
};
