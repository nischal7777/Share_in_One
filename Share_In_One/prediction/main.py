import os

import requests

a = requests.get('http://localhost:5000/nepse-data')
b = requests.get('http://localhost:5000/nepse-data')
c = requests.get('http://localhost:5000/nepse-data')
d = requests.get('http://localhost:5000/nepse-data')
e = requests.get('http://localhost:5000/nepse-data')
print(a.status_code)
print(b.status_code)
print(c.status_code)
print(d.status_code)
print(e.status_code)

port = 5555
os.system(f'uvicorn api:app --host 0.0.0.0 --port {port} --reload')
