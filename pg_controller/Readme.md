# Pg_controller

This controller for the postgres database has been written specifically for this project.
It exposes a REST API, that will allow us to add new cases to the postgres database, for the ID3 project.

## How to run this

After `git clone`'ing the whole project :
- `cd ID3/pg_controller`
- `go run main.go`

It will run on port `5000`.

## Docs

### Ressources

#### `football`

##### `POST`

**Desc:** Allows to add a new case to the database.

**Request body:**

|Name|possible values|type|isRequired?|
|-|-|-|-|
|`outlook`|overcast, sunny, rainy|str|**required**|
|`temp`|hot, mild, cold|str|**required**|
|`humidity`|high, normal|str|**required**|
|`wind`|strong, weak|str|**required**|
|`friends_avail`|true, false| boolean|**required**|
|`homework`|true, false| boolean|**required**|
|`day_night`|day, night|str|**required**|
|`localisation`|inside, outside|str|**required**|
|`lights`| true, false|boolean|**required**|
|`inj_sick`|open|str|**required**|
|`transport`|open|str|**required**|
|`result`|true, false| boolean|**required**|

To learn more about the use of each attribute, refer to `../DB_MODEL.md` [here](../DB_MODEL.md).

Eg. of a **valid request body** : 

```JSON
{
    "outlook": "overcast",
    "temp": "hot",
    "humidity": "high",
    "wind": "weak",
    "friends_avail": true,
    "homework": false,
    "day_night": "night",
    "localisation": "outside",
    "lights": false,
    "inj_sick": "no",
    "transport": "car",
    "result": true
}
```

##### `GET`

**Desc:** Allows to retrieve all the data from the table of cases.

**No parameter to pass**