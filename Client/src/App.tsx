// import React from 'react'
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { Approuter } from "../../Server/app";
import { useEffect, useState } from "react";

const client = createTRPCProxyClient<Approuter>({
  links: [
    loggerLink(),
    //     In tRPC, httpBatchLink is a terminating link used to optimize performance by combining multiple individual tRPC operations into a single HTTP request sent to the server. This reduces the number of round trips required between the client and server, leading to faster communication.

    // Here's a breakdown of its functionality:

    // Batching requests: It groups multiple tRPC operations (queries, mutations) into a single batch.
    // Sending a single HTTP request: The batched operations are then sent as a single HTTP request to the server.
    // Receiving individual responses: The server processes the batch and sends back individual responses for each operation within the original request.
    // Benefits of using httpBatchLink:

    // Improved performance: By reducing round trips, it can significantly improve the performance of your tRPC application, especially when dealing with numerous small requests.
    // Reduced network traffic: Combining requests into a single batch minimizes the overall network traffic between the client and server.
    // Points to consider:

    // Batch size and URL length: Ensure the combined batch size doesn't exceed the server's limitations and the URL length doesn't become too large, causing HTTP errors. You can adjust the maxURLLength option in httpBatchLink to control this.
    // Not suitable for all requests: It might not be ideal for large requests or those requiring immediate responses, as waiting for all responses within the batch can be slower.
    // Overall, httpBatchLink is a valuable tool in tRPC for optimizing performance when dealing with numerous small, independent tRPC operations.
    httpBatchLink({
      //this is the ending link and you cannot add any link after this, like if i want to use loggerlink after this, it will not work
      url: "http://localhost:3000/trpc",
      headers: {
        Authorization: "TOKEN",
      },
    }),
  ],
});

export default function App() {
  const [result, setResult] = useState<string>("");
  useEffect(() => {
    async function fetch() {
      var res = await client.logToServer.mutate("Hello World");
      var ures = await client.users.getUser.query({ userId: "123" });
      var ares = await client.admin.query("Hello There");
      setResult(await client.sayHi.query());
      console.log(res);
      console.log("res", ures);
      console.log(ares);
    }
    fetch();
  }, []);

  return <div>{result}</div>;
}
