import flask
from flask import request, jsonify,json
import ID3
import nujson as ujson
import requests
import pandas as pd
import os
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['DEBUG'] = False # Env variable needs to set this



@app.route('/', methods=['GET'])
@cross_origin()
def home():

    
    # Returns a list of all the items in the db
    r = requests.get('http://pg-controller:5000/football')
    if r.status_code != 200:
        return {"canGenerate":False, "message":"couldn't connect to db"}, 400,{'Content-Type': 'application/json'}

    items = r.json()
    if items is None:
        return {"canGenerate": False, "message": "Not enough Values"},200,{'Content-Type': 'application/json'}

    if len(items) < 15:
        return {"canGenerate": False, "message": "Not enough Values"},200,{'Content-Type': 'application/json'}

    df = pd.DataFrame()
    for item in items:
        dfItem = pd.DataFrame.from_records(item, index=[0])
        df = df.append(dfItem, ignore_index=True)    

    
    df.drop(columns="ID", inplace=True)
    
    tree = ID3.generate_decision_tree("", df=df) # Default tree for the API
    
    return  ujson.dumps({"canGenerate": True,"tree":tree}),200,{'Content-Type': 'application/json'}


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=4000)