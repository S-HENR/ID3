import pandas as pd


df = pd.read_csv("../py-id3/db/data.csv")
df["result"].replace({True: "yes", False: "no"}, inplace=True) # This will be easier to handle for the CLI
df.to_csv("../py-id3/db/data.csv")