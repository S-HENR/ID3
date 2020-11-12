import numpy as np
import pandas as pd
eps = np.finfo(float).eps
from numpy import log2 as log
import csv_handler as db


def calc_df_entropy(df,attribute):
    # Calculates the entropy of the whole dataset

    target_variables = df["result"].unique() 
    variables = df[attribute].unique()

    entropy_attribute = 0
    for variable in variables:
        entropy_each_feature = 0
        for target_variable in target_variables:
            num = len(df[attribute][df[attribute]==variable][df["result"] ==target_variable]) #numerator
            den = len(df[attribute][df[attribute]==variable])  #denominator
            fraction = num/(den+eps)  #pi
            entropy_each_feature += -fraction*log(fraction+eps) #This calculates entropy for one feature like 'Sweet'
        fraction2 = den/len(df)
        entropy_attribute += -fraction2*entropy_each_feature   #Sums up all the entropy ETaste

    return(abs(entropy_attribute))

def ig(e_dataset,e_attr):
    return(e_dataset-e_attr)

def calc_subtable_entropy(df):
    # Calculates the entropy of a subtable

    result_attr = df.keys()[-1]
    entropy = 0
    values = df[result_attr].unique()
    for value in values:
        fraction = df[result_attr].value_counts()[value]/len(df[result_attr])
        entropy += -fraction*np.log2(fraction)
    return entropy

def calc_subtable_attribute_entropy(df,attribute):
    # Calculates the entropy of a subtable for an unique attribute

    result_attr = df.keys()[-1]  

    target_variables = df[result_attr].unique()
    variables = df[attribute].unique()
    entropy2 = 0
    for variable in variables:
        entropy = 0
        for target_variable in target_variables:
            num = len(df[attribute][df[attribute]==variable][df[result_attr] ==target_variable])
            den = len(df[attribute][df[attribute]==variable])
            fraction = num/(den+eps)
            entropy += -fraction*log(fraction+eps)
        fraction2 = den/len(df)
        entropy2 += -fraction2*entropy
    return abs(entropy2)


def find_best_attribute(df):
    # Find the attribute wich gives the most information

    IG = []
    for key in df.keys()[:-1]:
        IG.append(calc_subtable_entropy(df)-calc_subtable_attribute_entropy(df,key))
    return df.keys()[:-1][np.argmax(IG)]
  
  
def get_subtable(df, attribute,value):
    # Filters the dataset to get only the explored branch
    return df[df[attribute] == value].reset_index(drop=True)


def build_tree(df,tree=None): 
    # Build the tree stocked in a variable `tree[][]`

    # result_attr = df.keys()[-1]


    node = find_best_attribute(df) # Attribute with max info
    
    att_value = np.unique(df[node]) # Get the distinct values that the attribute can take
    
    if tree is None:                    
        tree={}
        tree[node] = {}
    
    for value in att_value:
        
        subtable = get_subtable(df,node,value)
        clValue,counts = np.unique(subtable['result'],return_counts=True)                        
        
        if len(counts)==1:
            tree[node][value] = clValue[0]                                                    
        else:        
            tree[node][value] = build_tree(subtable)
                   
    return tree


def generate_decision_tree(csv_filename: str):
    # Generate a decision tree from a provided knowledge base, csv format.
    # Eg : csv_filename="data.csv".
    # Function called by the CLI.

    df = db.read(csv_filename)

    entropy_node = 0  # init entropy
    values = df["result"].unique()  # list of unique final values => values of "result" =>Only True or False
    

    for value in values:
        fraction = df["result"].value_counts()[value]/len(df["result"])  
        entropy_node += -fraction*np.log2(fraction)

    entropy_generator = {k:calc_df_entropy(df,k) for k in df.keys()[:-1]}
    entropy_generator

    res = build_tree(df)
    
    return res
    

# Debug
if __name__ == "__main__":
    r = generate_decision_tree("db/data.csv")
    print(r)