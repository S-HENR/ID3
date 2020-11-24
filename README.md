# ID3
Implementation of ID3 algorithm in Python

*Thomas MARTIN, Victor CAVERO, Séraphin HENRY*

## Description

We have a CSV file which is already filled with data. We use it to generate the tree using the ID3 algorithm.
The CLI will ask questions to the user, until a point when it announces which result was predicted. The user has the ability to confirm, or not, the predicted result.

If the predicted result is confirmed by the user, then it's all fine.
If not, then the CLI asks the user to enter some more additional data. The knowledge 

## This can be used through CLI but it wil also be deployed as a webApp

Here you can find the database model that the webApp uses : [(link)](DB_MODEL.md)

### ID3 algorithm

To build our tree we follow a few key steps :
- Read the .csv to stock it in a variable `df`
- To calcule the entropy :
    - Isolate the column result to count the occurences of `yes` and  `no`
    - Calculate general entropy
- To build the tree we use the function `buildTree()`
    -  Find the attribute with the best information gain `find_winner()`
    - Get distinct values of this attribute
    - If an attribute only have `yes` or only `no`, then it becomes a leaf and is marked by `yes` or `no`
    - If an attribute have `yes` and `no`, then the algorithm call the function `buildTree()` recursively with the subtable.

### Functions explained

|Function|Parameters|Description|
|---|---|---|
|`calc_df_entropy`|`df`: records of the .csv ; `attribute`: stock result unique values|Calculates the entropy of the whole dataset|
|`calc_subtable_entropy`|`df`: dataset of a subtable|Calculate the entropy of a subtable|
|`calc_subtable_attribute_entropy`|`df`: dataset of a subtable, `attribute`: unique attribute of a subtable|Calculates the entropy of a subtable for an unique attribute|
|`find_best_attribute`|`df`: dataset of a subtable|Find the attribute wich give the most information|
|`get_subtable`|`df`: dataset of a subtable ; `attribute`: which attribute we will explore ; `value`: data|Filters the dataset to get only the explored branch|
|`build_tree`|`df`: dataset explored | Build the tree stocked in a variable `tree[][]`|
|`generate_decision_tree`|`csv_filename` : Name of the .csv which provide data| General function to read the csv, calculate the entropy and build the tree to return the final tree|

## Run the thing in CLI mode

- `git clone` the project (or dowload and `unzip` the archive)
- `cd` inside of it
- `cd py-id3`

**and**

### Run locally

You'll need `pipenv`, unless you're ready to install the dependencies by hand.

##### Install pipenv

`pip install pipenv`

##### Install the dependencies

`pipenv install` **and** `pipenv shell`

##### Run !

`python3.8 main.py` or `pipenv run python3.8 main.py`

### ... or with docker

- `docker build -f Dockerfile.cli -t id3py .`

Then, if you're using **Linux/MacOS/Unix** :
- `docker run -v $(pwd)/db:/app/db -it id3py`

Or if you're using **Windows** :

- `docker run -v ${PWD}/db:/app/db -it id3py`

**The `data.csv` file in the `db` folder will be overwritten when the program estimates that it's necessary to update the db.**

You can also specify another folder, which contains a file named `data.csv` that you want to use :

`docker run -v PATH_TO_YOUR_FOLDER:/app/db -it id3py`

## Use your own knowledge base

For now, the program uses the file called `db/data.csv` as a knowledge base.
You can use yours, as long as the column for the output is called `result`, and that it contains `yes` and `no`.