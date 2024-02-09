import requests
import random



for i in range(1, 41):

    
    r1 = random.randint(1, 100)
    r2 = random.randint(1, 100)
    r3 = random.randint(1, 100)
    r4 = random.randint(1, 100)

    url = f"http://localhost:4000/sensor/insertdata?id=xy00{i}&thickness={r1}&devicetemp={r2}&signal={r3}&batterylevel={r4}"
    
    # Send the data to the URL using the requests library
    response = requests.get(url)
    
    # Print the response if needed
    print(f"Data sent for iteration {i}. Response: {response.text}")
