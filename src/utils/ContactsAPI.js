const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://careers.picpay.com/tests/mobdev/users'

export const getAll = () =>

  fetch(`${api}`)
  .then(response => {
      if (response.status >= 400) {
          throw new Error('Algo deu errado, desculpe :(');
      }
      return response.json()
  }).then(contacts => contacts
  ).catch(error => {
      console.log(error);
      throw new Error('Algo deu errado, desculpe :(');
  });
