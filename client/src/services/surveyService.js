export const ID3 = {'outlook': {'overcast': 'yes', 'rainy': {'windy': {'false': 'yes', 'true': 'no'}}, 'sunny': {'humidity': {'high': 'no', 'normal': 'yes'}}}};

const pgctrlHost = process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://pgctrl.furio.team"
const id3Host = process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:4000" : "https://id3.furio.team"

export const sendSurvey = (data) => (
    fetch(pgctrlHost+'/football', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
);

export const getTree = () => {
  return fetch(id3Host+'/')
}