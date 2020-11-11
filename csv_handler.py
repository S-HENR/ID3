import pandas as pd


def read(csv_filename: str):
    # Read knowledge for a csv file, returns a pandas dataframe


    # Cleaning dataset, replacing yes and no final values by True & False
    df = pd.read_csv(csv_filename)
    df["result"].replace({"yes": True, "no": False}, inplace=True) # This will be easier to handle for the CLI

    return df

def update_db(new_data_df: pd.DataFrame,csv_filename: str):
    # Writes new version of the knowledge base in the targeted csv file
    # new_data_df contains the new data as a pandas dataframe

    old_df = read(csv_filename)

    new_df = old_df.append(new_data_df, ignore_index=True)

    new_df.to_csv(csv_filename)
    