const handleReturn = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};
// запрос общего курса валют
export const getAllCurrency = (currency: string) => {
  return fetch(`https://v6.exchangerate-api.com/v6/de4f0861779f07d13276f98d/latest/${currency}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => handleReturn(res));
};
