import numpy as np
import pandas as pd
eps = np.finfo(float).eps
from numpy import log2 as log
import csv_handler as db


def ent(df,attribute):
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

def find_entropy(df):
    result_attr = df.keys()[-1]
    entropy = 0
    values = df[result_attr].unique()
    for value in values:
        fraction = df[result_attr].value_counts()[value]/len(df[result_attr])
        entropy += -fraction*np.log2(fraction)
    return entropy

def find_entropy_attribute(df,attribute):
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


def find_winner(df):
    IG = []
    for key in df.keys()[:-1]:
        IG.append(find_entropy(df)-find_entropy_attribute(df,key))
    return df.keys()[:-1][np.argmax(IG)]
  
  
def get_subtable(df, node,value):
  return df[df[node] == value].reset_index(drop=True)


def buildTree(df,tree=None): 
    result_attr = df.keys()[-1]
    print(result_attr)
    #Here we build our decision tree

    #Get attribute with maximum information gain
    node = find_winner(df)
    
    #Get distinct value of that attribute e.g Salary is node and Low,Med and High are values
    attValue = np.unique(df[node])
    
    #Create an empty dictionary to create tree    
    if tree is None:                    
        tree={}
        tree[node] = {}
    
   #We make loop to construct a tree by calling this function recursively. 
    #In this we check if the subset is pure and stops if it is pure. 

    for value in attValue:
        
        subtable = get_subtable(df,node,value)
        clValue,counts = np.unique(subtable['result'],return_counts=True)                        
        
        if len(counts)==1:#Checking purity of subset
            tree[node][value] = clValue[0]                                                    
        else:        
            tree[node][value] = buildTree(subtable) #Calling the function recursively 
                   
    return tree

######
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

    entropy_generator = {k:ent(df,k) for k in df.keys()[:-1]}
    entropy_generator

    res = buildTree(df)
    
    return res
    

# Debug
if __name__ == "__main__":
    r = generate_decision_tree("data.csv")
    print(r)