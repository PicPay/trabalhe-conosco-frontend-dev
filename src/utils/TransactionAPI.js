var fetchEnd = new Event( 'fetchEnd', { 'view': document, 'bubbles': true, 'cancelable': false } );

export const sendTransaction = (data) =>

  (async () => {
    const rawResponse = await fetch('http://careers.picpay.com/tests/mobdev/transaction', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    document.dispatchEvent(fetchEnd);
    return await rawResponse.json()
  })();



  document.addEventListener('fetchEnd', function() {
    let spinner = document.getElementById('spinner');
    let containerTransaction = document.getElementById('container-transaction');
    containerTransaction.style.display = 'flex';
    spinner.style.display = 'none';
  });
