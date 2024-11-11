import zmq from "zeromq";
import axios from "axios";

async function getQuote() {
  try {
    const response = await axios.get("https://favqs.com/api/qotd", {
    });
    const quote = response.data.quote;
    const quote_body = response.data.quote.body
    const quote_author = response.data.quote.author
    return { quote_body, quote_author };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Something went wrong and a quote could not be send";
  }
}

async function run() {
  const sock = new zmq.Publisher();

  await sock.bind("tcp://127.0.0.1:3004");
  console.log("Publisher bound to port 3004");

  while (true) {
    const { quote_body, quote_author } = await getQuote();
    console.log("Sending daily quote body:", quote_body);
    await sock.send(["quote_body", quote_body]);
    console.log("Sending daily quote author:", quote_author);
    await sock.send(["quote_author", quote_author]);
    await new Promise((resolve) => {
      setTimeout(resolve, 86400000); 
    });
  }
}

run();
