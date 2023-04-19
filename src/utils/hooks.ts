export const handleLanguage = (country: string) => {
  return country === 'Russia' ? 'ru' : 'en';
};

export function getNumbersFromString(value: string) {
  const reg = /[0-9]{1,}/gi;
  const result = value.toString().match(reg);
  return result ? Number(result.join('')) : null;
}

export const handleCurrency = (country: string) => {
  return country === 'ru' ? 'RUB' : 'USD';
};
