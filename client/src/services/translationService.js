const translatorHost = process.env.NODE_ENV === 'development' ? "http://localhost:6001" : "https://translator.furio.team"


export const getTranslation = (data) => (
    fetch(translatorHost+'/', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
);

export const getFormTranslation = (data) => (
    fetch(translatorHost+'/form', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
);