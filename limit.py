import requests
import random

fakeData = [
    { "id": "1 Min" },
    { "id": "5 Min" },
    { "id": "1 Day" },
    { "id": "7 Days" },
    { "id": "15 Days" }
]

for i in range(1, 41):
   
    data = random.choice(fakeData)
    time = data["id"]
    # if  data["id"] == "1 Min":
    #     time = "1 "
    # elif data["id"] == "5 Min":
    #     time = "5"
    # elif  data["id"] == "1 Day":
    #     time = "1440 "
    # elif  data["id"] == "7 Days":
    #     time = "10080"
    # elif  data["id"] == "30 Days":
    #     time = "43200"
    input_thickness = random.randint(40, 80)
    # url = f"http://localhost:4000/backend/setlimit?id=XY000{i:02}&time={time}&inputthickness={input_thickness}"
    url = f"http://15.206.193.179:5000/backend/setlimit?id=XY000{i:02}&time={time}&inputthickness={input_thickness}"
    response = requests.get(url)
    print(f"Data sent for iteration {i}. Response: {response.text}")