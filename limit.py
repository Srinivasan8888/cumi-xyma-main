import requests
import random

fakeData = [
    { "id": "5 Min" },
    { "id": "1 Day" },
    { "id": "7 Days" },
    { "id": "30 Days" }
]

for i in range(1, 41):
    # Select a random item from fakeData
    data = random.choice(fakeData)
    
    # Extract the id from the selected item
    time = data["id"]
    
    # Generate a random input thickness
    input_thickness = random.randint(20, 80)
    
    url = f"http://localhost:4000/sensor/setlimit?id=xy00{i}&time={time}&inputthickness={input_thickness}"
    
    # Send the data to the URL using the requests library
    response = requests.get(url)
    
    # Print the response if needed
    print(f"Data sent for iteration {i}. Response: {response.text}")
