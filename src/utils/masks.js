export const hideCard = cardNumber => `**** **** **** ${cardNumber.slice(-4)}`;

export const maskCard = cardNumber =>
  cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
