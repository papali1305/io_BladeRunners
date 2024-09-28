# ParQ: A Digital Twin of Bhubaneshwar city focused on parking management

## Brief About the Solution

ParQ is an innovative, comprehensive smart parking ecosystem that leverages cutting-edge technologies including IoT, 5G, LoRaWAN, MQTT, and AI/ML to revolutionize parking management in Bhubaneshwar city .

## Use Case Classification of Digital Twin

ParQ exemplifies many use cases through providing a robust ecosystem for all parking related issues by providing Digital Twin of Parking Lots:

- **Real-time Parking Management**: ParQ's digital twin enables real-time monitoring and management of parking facilities, including private and public parking lots, hospitals, government parking lots, and residential parking spaces. Users can register their parking spaces, and the system will provide real-time updates on availability, pricing, and other relevant information.
- **Scalable and Secure Database**: ParQ uses MongoDB as its NoSQL database for storing and retrieving large amounts of data. The system also employs PostgreSQL for structured data and ensures end-to-end encryption for all data transmissions.
- **User-Friendly Interface**: ParQ's interface provides an intuitive and user-friendly experience for users to search, book, and pay for parking spots. It also offers features like real-time traffic updates, parking availability, and routing guidance to make parking easier and more efficient.

<!-- <div style="page-break-before:always"></div> -->

### Complex WebSockets and Digital Twins

ParQ implements complex WebSockets to create a bi-directional communication channel between the client and server, using Socket.IO. The system uses WebSockets to create a digital twin framework, which creates a virtual replica of the physical parking infrastructures covering the entire city. The digital twin technology is based on a microservices architecture, with each service responsible for a specific aspect of the parking ecosystem.
The services are:

- **Parking Service**: Responsible for managing parking space availability, pricing, and real-time updates. It uses a Map Tiler with Leaflet to display real-time parking availability on a map, and MongoDB to store and retrieve parking data.
- **User Service**: Handles user authentication, authorization, and profile management. It uses WebSockets to provide real-time updates to users about parking availability and other relevant information.
- **Analytics Service**: Responsible for data analytics, predictive modeling, and real-time insights. It uses WebSockets to provide real-time data analytics and insights to users.

The system uses a Tap Architecture to handle the complexity of using WebSockets to create a digital twin with a map tiler and MongoDB database. The Tap Architecture is a design pattern that allows the system to handle complex events and data flows in a scalable and fault-tolerant manner. It uses a combination of WebSockets, RESTful APIs, and message queues to handle the complexity of the system.

<div style="page-break-before:always"></div>

## ParQ Workflow

![ParQ Workflow](https://gcdnb.pbrd.co/images/D0RKtgd9I3rO.png?o=1)

### Efficient Parking Management Ecosystem

The combination of WebSocket and MQTT protocols enables an efficient parking management ecosystem:

- **Real-Time Monitoring**: Continuous data flow from sensors to the cloud allows for real-time monitoring of parking spaces.
- **Real-Time Booking**: Users can book and reserve specific parking spots in real-time, ensuring availability and convenience.
- **Predictive Availability**: Real-time data analysis provides insights into parking space availability, allowing for more efficient resource allocation.
- **Optimized Resource Allocation**: The system optimizes parking space allocation, reducing congestion and waiting times for users.
- **Enhanced User Experience**: The mobile application provides users with real-time updates, predictive availability, and seamless booking experiences, enhancing overall user satisfaction.

## Tech Stack

- **React** for client-side application development
- **MongoDB** for real-time data streaming
- **WebSocket** for real-time communication

## Team:

- **ParQ**
  - **Pratik Kuamr Sahoo** (Team Lead)
  - **Shruti**
  - **Piku**
  - **bharti**
  - **Papayali**
