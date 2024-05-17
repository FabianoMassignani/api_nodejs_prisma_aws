export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("pt-BR", options);
  return formattedDate;
};
