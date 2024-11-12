# Daily Quote

This microservice provides a daily quote and daily quote author sing ZeroMQ's publisher-subscriber pattern. 

## Prerequisites
- **Node.js** installed on your system

## Installation

Clone the repository to your local machine:
   ```bash
   git clone https://github.com/dmarcisovska/quote_microservice.git
   cd current-date-time-microservice
```

## How to run

```
npm install
npm start
```

This command will start a ZeroMQ publisher bound to tcp://127.0.0.1:3000. You’ll see console logs for each message sent, with different date and time formats.

## Topics and Message Formats
The microservice publishes messages on the following topics:

- quote_body: Returns a quote
- quote_author: Returns the quote author

## Example Subscriber Code

To receive messages from this microservice publisher, you need a ZeroMQ subscriber that connects to tcp://127.0.0.1:3000 and subscribes to time. Here’s an example:

```
import zmq from "zeromq";

async function run() {
  const sock = new zmq.Subscriber();

  sock.connect("tcp://127.0.0.1:3000");
  sock.subscribe("quote_body");
  sock.subscribe("quote_author");
  console.log("Subscriber connected to port 3000");

  for await (const [topic, msg] of sock) {
    console.log(
      topic.toString(),
      ":",
      msg.toString()
    );
  }
}

run();

```




