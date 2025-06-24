import { VALID_CATEGORIES } from '../shared/constants/general.constants';
import { inputListFormatter } from './formatter.util';

export const isCategoryValid = (categories: any) => {
  let isValid = true;
  
  const formattedCategories = inputListFormatter(categories);
  
  for (const category of formattedCategories) {
    if (!VALID_CATEGORIES.includes(category)) {
      isValid = false;
    }
  }
  
  return isValid;
};