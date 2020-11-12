import pandas as pd
import numpy as np

def read(csv_filename: str):
    # Read knowledge for a csv file, returns a pandas dataframe


    # Cleaning dataset, replacing yes and no final values by True & False
    df = pd.read_csv(csv_filename)
    df["result"].replace({"yes": True, "no": False}, inplace=True) # This will be easier to handle for the CLI

    print("__ACTUAL KNOWLEDGE BASE__")
    print(df)
    print("___________")
    return df

def update_db(new_data_df: pd.DataFrame,csv_filename: str):
    # Writes new version of the knowledge base in the targeted csv file
    # new_data_df contains the new data as a pandas dataframe
    
    old_df = pd.read_csv(csv_filename)
    

    new_data_df_alt = new_data_df.copy()
    old_df_alt = old_df.copy()

    new_data_df_alt["result"].replace({"yes": True, "no": False}, inplace=True)
    new_data_df_alt["result"] = not new_data_df_alt["result"].bool()
    
    old_df_alt["result"].replace({"yes": True, "no": False}, inplace=True)
    
    new_data_row = new_data_df_alt.values
    
    
    # Check if a row containing all the exact same values for EACH COLUMN, but with a different result, exist.
    matches = old_df_alt[(old_df_alt == new_data_row).all(axis=1)]

    # If so, it has to be dropped, and replaced by the new row.
    if not matches.empty:
        old_df.drop(matches.index, inplace=True)
        old_df.reset_index(inplace=True)

    new_df = old_df.append(new_data_df, ignore_index=True)
    new_df.drop(columns="index", inplace=True)
    new_df.to_csv(csv_filename, index=False)