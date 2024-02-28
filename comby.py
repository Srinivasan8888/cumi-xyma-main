import requests
import random
import time

fakeData = [
    { "id": "5 Min" },
    { "id": "1 Day" },
    { "id": "7 Days" },
    { "id": "30 Days" }
]

while True:  # Run indefinitely
    for i in range(1, 41):
        data = random.choice(fakeData)
        time_interval = data["id"]
        input_thickness = random.randint(40, 80)
        url_limit = f"http://localhost:4000/sensor/setlimit?id=xy00{i}&time={time_interval}&inputthickness={input_thickness}"
        response_limit = requests.get(url_limit)
        print(f"Data sent for iteration {i} to set limit. Response: {response_limit.text}")

        r1 = random.randint(1, 80)
        r2 = random.randint(1, 100)
        r3 = random.randint(1, 100)
        r4 = random.randint(1, 100)

        url_data = f"http://localhost:4000/sensor/insertdata?id=xy00{i}&thickness={r1}&devicetemp={r2}&signal={r3}&batterylevel={r4}"
        response_data = requests.get(url_data)
        print(f"Data sent for iteration {i} to insert data. Response: {response_data.text}")

    time.sleep(5)  # Wait for 5 seconds before sending data again
