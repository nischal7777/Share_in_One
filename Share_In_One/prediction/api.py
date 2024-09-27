import json
from decimal import Decimal

import requests
from databases import Database
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model.model import get_company_data, get_company_list, predict_stock

app = FastAPI(debug=True)
origins = ['http://localhost:3000']

import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
IPAddr = s.getsockname()[0]
database = Database('mysql://root:root@localhost/sone')

port = 5555

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get('/predict/{stock_name}')
async def predict(stock_name:str):
  await database.connect()
  verify_request = requests.get('http://localhost:5000/nepse-data')
  print(verify_request.status_code)
  query = 'SELECT ltp FROM Stocks WHERE company_name = :company_name ORDER BY createdAt DESC'
  value = {
    "company_name":stock_name.upper()
  }
  rows = await database.fetch_all(query=query, values=value)
  last_four = rows[:4]
  print(last_four)
  result = all(element == last_four[0] for element in last_four)
  first = str(rows[0])
  second = str(rows[0])
  third = str(rows[0])
  fourth = str(rows[0])
  a = float(first.split('\'')[1])
  b = float(second.split('\'')[1])
  c = float(third.split('\'')[1])
  d = float(fourth.split('\'')[1])

  company_stock_data = get_company_data(company_name=stock_name.upper())
  predicted_stock_value = predict_stock(company_stock_data, a,b,c,d)

  return {'msg': predicted_stock_value}


@app.get('/')
async def a():
  return {
    'info':'THIS API IS FOR PREDICTING NEPSE STOCKS',
    'endpoint': {
      'uri':'/predict/{company_name}',
      'example':f'http://{IPAddr}:{port}/predict/nabil'
    },
    'company_list': list(get_company_list())
  }


@app.get('/test')
async def b():
  await database.connect()
  data = await database.fetch_all('select * from Users')
  return data
