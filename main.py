# CLI PART


import ID3

def main():
    print("hi CLI")

    fake_tree_dict = {'outlook': {'overcast': True,
             'rainy': {'windy': {'FALSE': True, 'TRUE': False}},
             'sunny': {'humidity': {'high': False, 'normal': True}}}}

    tree = ID3.generate_decision_tree(csv_filename="data.csv")

    print(tree)

    # dict_boi = function_id3_shit()


    # "key1" ?
    #  answer ==  valueOfKey1 ?
    #  

def go_through_tree_dict(dict_boi: dict):
    print('go_through_answer_dict')

if __name__ == "__main__": 
    main()