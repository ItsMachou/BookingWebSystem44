import axios from 'axios';

const createPayLink = (amount, description) => {
  const options = {
    method: 'POST',
    url: 'https://api.paymongo.com/v1/links',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic c2tfdGVzdF9mMjNUS0M4VjJLS1J5N3FWaUZLN3pmazY6'
    },
    data: {data: {attributes: {amount: amount, description: description}}}
  };

  axios
    .request(options)
    .then(res => {
      console.log('Payment link created:', res.data);
      const linkId = res.data.data.id;
      retrievePayLinkDetails(linkId);
    })
    .catch(err => console.error(err));
};

const retrievePayLinkDetails = (linkId) => {
  const options = {
    method: 'GET',
    url: `https://api.paymongo.com/v1/links/${linkId}`,
    headers: {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF9mMjNUS0M4VjJLS1J5N3FWaUZLN3pmazY6'
    }
  };

  axios
    .request(options)
    .then(res => {
      console.log('Retrieved link:', res.data);
      const checkoutUrl = res.data.data.attributes.checkout_url;
      const referenceNumber = res.data.data.attributes.reference_number;
      console.log('Checkout URL:', checkoutUrl);
      console.log('Reference Number:', referenceNumber);
      // Store checkoutUrl and referenceNumber in the database
    })
    .catch(err => console.error(err));
};

// Example usage with a specific amount and description
createPayLink(20000, 'Payment for services');