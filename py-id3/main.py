import ID3
import pandas as pd
from PyInquirer import prompt
import csv_handler



def ask_question(key,df):
    # In this method we use the key to create the question and 
    # the dataframe to know all the posibilities for each key 
    
    possibilities = df.groupby(key).count().index.get_level_values(key)
    is_bool = False
    # Passing a list of boolean possibilities to pyinquirer doesn't work :(
    if possibilities.inferred_type == "boolean":
        is_bool = True
        possibilities = possibilities.map({True: "yes", False: "no"})

   
    question = {
            'type': 'list',
            'name': key,
            'message': key,
            'choices': possibilities
        }

    answer_dict = prompt(question)
    answer = answer_dict[key]

    if is_bool:
        if answer == "yes":
            return True
        else:
            return False


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

            predicted_str = {True: "yes", False: "no"}

            print('Predicted value for ' + df.columns[-1] + ' is ' + predicted_str[predicted])
    
            answer = ask_question(df.columns[-1], df)
            answers[df.columns[-1]] = answer

    if(answer.lower() in ['yes','true']): answer_value = True
    else : answer_value = False 

    return(answer_value == predicted)

def main():

    fileName = 'db/data.csv'
    answers = dict() # to store the answers of the user 
    tree = ID3.generate_decision_tree(csv_filename=fileName) # Generate the ID3 Tree
    print("tree is :" + str(tree))
    df = pd.read_csv(fileName) # To know columns of the dataset
    for x in df.columns : answers[x] = ''
    df["result"].replace({True: "yes", False: "no"}, inplace=True) # This will be easier to handle for the CLI

    right_prediction = go_through_tree_dict(tree,df,answers)
    
    if(not right_prediction):
        # Ask non asked questions
        for key,value in answers.items():
            if (value == ''):
                answer = ask_question(key,df) # With key we define the question we want to ask
                answers[key] = answer
    
    # print(answers) # Print the final obtained data    
    
    # If the prediction wasn't right, we have to write new knowledge in the db
    if(not right_prediction):
        new_data = pd.DataFrame(answers, index=[0])
        csv_handler.update_db(new_data_df=new_data,csv_filename=fileName)
	
if __name__ == '__main__': 
    main()
