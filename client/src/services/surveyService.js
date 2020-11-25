export const ID3 = {'outlook': {'overcast': 'yes', 'rainy': {'windy': {'false': 'yes', 'true': 'no'}}, 'sunny': {'humidity': {'high': 'no', 'normal': 'yes'}}}};


export const sendSurvey = (data) => (
    fetch('https://pgctrl.furio.team/football', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
);

export const getTree = () => {
  return fetch('https://id3.furio.team/')
}