# import requests
# import random
# import time
# from datetime import datetime

# while True:
#     for i in range(1, 41):
#         r1 = random.randint(1, 80)
#         r2 = random.randint(1, 100)
#         r3 = random.randint(1, 32)
#         r4 = random.randint(265, 540)
#         r5 = random.randint(265, 540)
#         t= datetime.now()
#         # print(f"XY000{i:02}")  # Print with leading zeros
#         url_data = f"http://localhost:4000/sensor/insertData?device_name=XY000{i:02}&thickness={r1}&device_status={r2}&signal_strength={r3}&battery_status={r4},{r5}"
#         response_data = requests.get(url_data)
#         print(f"Data sent for iteration {i} to insert data. Response: {response_data.text}")
#     time.sleep(1)
    

import requests
import random
import time
from datetime import datetime

# while True:
for i in range(1, 41):
    r1 = random.randint(1, 80)
    r2 = random.randint(1, 100)
    r3 = random.randint(1, 32)
    r4 = random.randint(265, 540)
    r5 = random.randint(265, 540)
    r6 = random.randint(265, 540)
    t= datetime.now()
    # print(f"XY000{i:02}")  # Print with leading zeros
    url_data = f"http://43.204.133.45:5000/backend/insertData?device_name=XY000{i:02}&thickness={r1}&device_status={r2}&signal_strength={r3}&battery_status={r4},{r5},{r6}"
    response_data = requests.get(url_data)
    
    print(f"Data sent for iteration {i} to insert data. Response: {response_data.text}")
    # time.sleep(1)
    