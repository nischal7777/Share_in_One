import math
from cmath import nan

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split


def get_company_data(company_name):
  data = pd.read_csv('data.csv', thousands=',')
  company_data = data.loc[data['Symbol']==company_name]
  return company_data

#training and predicting NABIL data
data = get_company_data(company_name='NABIL')


def predict_stock(data, *args):
  x = data.loc[:,'High':'Vol']
  y = data.loc[:,'Open']
  x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.1,random_state = 0)
  LR = LinearRegression()
  LR.fit(x_train,y_train)
  LR.score(x_test,y_test)*100

  previous_four_days = [[*args]]
  pred = LR.predict(previous_four_days)
  return pred[0]


def get_company_list():
  data = pd.read_csv('data.csv', thousands=',')
  data = data.fillna(value='')
  company_list = data['Symbol'].unique()
  return list(company_list)
