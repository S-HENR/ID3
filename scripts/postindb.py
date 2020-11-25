import requests
import random
import pandas as pd


dic = {
        "outlook": ["sunny", "rainy","overcast"],
        "temp": ["hot","mild", "cold"],
        "humidity": ["high","normal"],
        "wind": ["strong","weak"],
        "friends_avail": [True, False],
        "homework": [True, False],
        "day_night": ["day", "night"],
        "localisation": ["outside","inside"],
        "lights": [True, False],
        "inj_sick": ["no","boarf","yes","uh"],
        "transport": ["car", "bus", "bike"],
        "result": [True, False]
    }
array_of_things = []
for i in range(30):
    thing = {}
    for key in dic:
        possib_val = dic[key]
        thing[key] = possib_val[random.randint(0, len(possib_val)-1)]
    array_of_things.append(thing)
    # x = requests.post("http://localhost:5000/football", json = thing)
    # print(x.text)
    
# df = pd.DataFrame.from_dict(array_of_things)
# df.to_csv("data.csv")