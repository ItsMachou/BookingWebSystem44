const axios = require('axios');

const createPayLink = (amount, description) => {
  const options = {
    method: 'POST',
    url: 'https://api.paymongo.com/v1/links',
    headers: {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF9mMjNUS0M4VjJLS1J5N3FWaUZLN3pmazY6',
      'content-type': 'application/json'
    },
    data: {
      data: {
        attributes: {
          amount: amount,
          description: description
        }
      }
    }
  };

  return axios.request(options)
    .then(res => {
      const checkoutUrl = res.data.data.attributes.checkout_url;
      console.log('Checkout URL:', checkoutUrl);
      return checkoutUrl;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};

const redirectToCheckout = (amount, description) => {
  createPayLink(amount, description)
    .then(checkoutUrl => {
      window.location.href = checkoutUrl;
    })
    .catch(err => console.error(err));
};

// Example usage with a specific amount and description
redirectToCheckout(20000, 'Payment for services');