from time import time
import requests
import pika
import json
import logging
import time

class Producer:
    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1/forecast?latitude=-15.79&longitude=-47.88&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        self.connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='weather_data')
        

    def get_data(self):
        url = self.base_url
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    
    def publish_weather_data(self, data):
        self.channel.basic_publish(exchange='', routing_key='weather_data', body=json.dumps(data))

if __name__ == "__main__":
    producer = Producer()
    while True:
        weather_data = producer.get_data()
        producer.publish_weather_data(weather_data)
        logging.info("Sent weather data to queue")
        time.sleep(10)
