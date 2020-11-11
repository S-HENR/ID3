# ID3
Implementation of ID3 algorithm in Python

## Description

We have a CSV file which is already filled with data. We use it to generate the tree using the ID3 algorithm.

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

|Function|Attributes|Description|
|---|---|---|
|`ent()`|`df`: records of the .csv ; `attribute`: stock result unique values|Calculate the entropy of the whole dataset|
|`find_entropy()`|`df`: dataset of a subtable|Calculate the entropy of a subtable|
|`find_entropy_attribute()`|`df`: dataset of a subtable, `attribute`: unique attribute of a subtable|Calculate the entropy of a subtable for an unique attribute|
|`find_winner()`|`df`: dataset of a subtable|Find the attribute wich give the most information|
|`get_subtable()`|`df`: dataset of a subtable ; `node`: which attribute we will explore ; `value`: data|Split the dataset to get only the branch explored|
|`buildTree()`|`df`: dataset explored | Build the tree stocked in a variable `tree[][]`|
|`generate_decision_tree()`|`csv_filename` : Name of the .csv which provide data| General function to read the csv, calculate the entropy and build the tree to return the final tree|


## Run the thing

You'll need `pipenv`, unless you're ready to install the dependencies by hand.

### Install pipenv

`pip install pipenv`

### Install the dependencies

`pipenv install`

### Run !

`python3.8 main.py` or `pipenv run python3.8 main.py`