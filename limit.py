import requests
import random

fakeData = [
    { "id": "5 Min" },
    { "id": "1 Day" },
    { "id": "7 Days" },
    { "id": "30 Days" }
]

for i in range(1, 41):
   
    data = random.choice(fakeData)
    time = data["id"]
    input_thickness = random.randint(40, 80)
    url = f"http://localhost:4000/sensor/setlimit?id=xy00{i}&time={time}&inputthickness={input_thickness}"
    response = requests.get(url)
    print(f"Data sent for iteration {i}. Response: {response.text}")

