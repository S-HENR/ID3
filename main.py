import ID3
import pandas as pd
from PyInquirer import prompt

def main():

    fileName = 'data.csv'
    answers = dict() # to store the answers of the user 
    tree = ID3.generate_decision_tree(csv_filename=fileName) # Generate the ID3 Tree

    df = pd.read_csv(fileName) # To know columns of the dataset
    for x in df.columns : answers[x] = ''

    right_prediction = go_through_tree_dict(tree,df,answers)
    
    if(not right_prediction):
        # Ask non asked questions
        for key,value in answers.items():
            if (value == ''):
                answer = ask_question(key,df) # With key we define the question we want to ask
                answers[key] = answer
    
    print(answers) # Print the final obtained data
                

def ask_question(key,df):
    # In this method we use the key to create the question and 
    # the dataframe to know all the posibilities for each key 
    possibilities = df.groupby(key).count().index.get_level_values(key)

    question = {
            'type': 'list',
            'name': key,
            'message': key,
            'choices': possibilities
        }

    answer_dict = prompt(question)
    answer = answer_dict[key]

    return answer

def go_through_tree_dict(tree,df,answers):
    leaf = False
    while(leaf == False):
        if(type(tree) is dict):
            key = list(tree.keys())[0]
            tree = tree[key]
            
            answer = ask_question(key,df)
            answers[key] = answer
            tree = tree[answer]

        else :
            # when the first loop ends we have in 'tree' the final predicted value
            predicted = tree
            leaf = True

            print('Predicted value for ' + df.columns[-1] + ' is ' + str(predicted))
    
            answer = ask_question(df.columns[-1], df)
            answers[df.columns[-1]] = answer

    if(answer.lower() in ['yes','true']): answer_value = True
    else : answer_value = False 

    return(answer_value == predicted)

if __name__ == '__main__': 
    main()