export const hideCard = cardNumber => `**** **** **** ${cardNumber.slice(-4)}`;

export const maskCard = cardNumber =>
  cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');

export const unmaskCurrency2Float = (value) => {
  const comma2Dot = String(value).replace(/,/, '.').replace(/[^\d.]/g, '');
  return parseFloat(comma2Dot);
};

export const maskCurrency = value =>
  `R$ ${String(value.toFixed(2)).replace(/\./, ',')}`;

export const shortExpirationDate = value =>
  `${value.slice(0, 3)}${value.slice(-2)}`;
