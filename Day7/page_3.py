import streamlit as st
import pandas as pd

st.markdown("# Page 3 🎉")
st.sidebar.markdown("# Page 3 🎉")

file_read = pd.read_csv('Billionaires (1).csv', index_col=[0])
file_read["Net Worth"] = file_read["Net Worth"].apply(lambda x: x[1: -1])
file_read["Net Worth"] = pd.to_numeric(file_read["Net Worth"])
df = pd.DataFrame(file_read)

type = df.dtypes


#btvn
numbers = list(range(1, 101))


new_list = []
for i in  numbers:
    if i % 2 != 0 :
        new_list.append(i)

squares = {i: i**2 for i in range(1, 11)}



data = {
    "Name": ['Alice','Bob','Charlie','David','Eva','Frank','Grace','Hannah'],
    "Age": [24,27,22,32,29,40,35,30],
    "Department": ['HR', 'IT', 'Finance', 'IT', 'HR', 'Finance', 'IT', 'Marketing'],
    "Salary": [48000,52000,55000,60000,49000,58000,61000,47000]
}
df = pd.DataFrame(data, index=[1,2,3,4,5,6,7,8])
midlle_aged = (df[df["Age"] > 30][["Name", "Age"]])
total = (df["Salary"].sum())
bilionarire = (df[df["Salary"] > 50000][df['Age'] < 40][["Name", "Age", "Salary"]])
        

st.write(df, type, numbers, new_list, squares , midlle_aged, total, bilionarire)
