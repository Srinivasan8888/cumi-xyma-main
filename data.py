import requests
import random
import time
from datetime import datetime

while True:
    for i in range(1, 41):
        r1 = random.randint(1, 80)
        r2 = random.randint(1, 100)
        r3 = random.randint(1, 100)
        r4 = random.randint(1, 100)
        t= datetime.now()
        # print(t)
        url_data = f"http://localhost:4000/sensor/insertdata?id=xy00{i}&thickness={r1}&devicetemp={r2}&signal={r3}&batterylevel={r4}"
        response_data = requests.get(url_data)
        print(f"Data sent for iteration {i} to insert data. Response: {response_data.text}")
    time.sleep(5)
    
