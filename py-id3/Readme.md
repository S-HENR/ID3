# Py-id3

These source files can be used in CLI mode or consumed via the REST API.

Instructions to run this as CLI are [here.](../README.md)

## REST API

### Details

The source files consitute a REST Api that will run on port 4000.
It is **mandatory** to start the second service `pg-controller`, which also exposes a REST Api on port 5000, and to make sure that it can be accessed by this `py-id3` REST API.

The `py-id3` REST API exposes only one functionnality, through the resource `/` and the method `GET`.

This functionnality retrieves data from the db, and builds up the optimal decision tree if they are 15 entries or more in the db.

#### Responses

**Error occured:** 

Status code = **400**

```JSON
{"canGenerate":false, "message":"couldn't connect to db"}
```

**Not enough item in db:**

Status code = **200**

```JSON
{"canGenerate": false, "message": "Not enough Values"}
```

**Everything went fine, and there are enough items in the db:**

Status code = **200**

```JSON
{"canGenerate": true,"tree":{...}}
```

### Run with docker

 - `docker build -t flaskid3 .`
 - `docker run -p 4000:4000 flaskid3`