export const inputListFormatter = (inputList: any): string[] => {
  if (Array.isArray(inputList)) {
    return inputList.map((item: string) =>
      item.trim().charAt(0).toUpperCase() + item.trim().slice(1)
    );
  }

  if (typeof inputList === 'string') {
    return inputList
      .split(',')
      .map((item: string) =>
        item.trim().charAt(0).toUpperCase() + item.trim().slice(1)
      );
  }

  return inputList;
};

export const formatDateFromIsoToBr = (date: string) => {
  const dateString = date.split('T')[0];
  const [ year, month, day ] = dateString.split('-');
  const formattedDateToBr = `${day}/${month}/${year}`;
  return formattedDateToBr
}

export const formatDateToDashBr = (date: string): string => {
  if (!date.includes('/')) return date;
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}