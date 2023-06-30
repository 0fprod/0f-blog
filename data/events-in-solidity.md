---
title: Events in Solidity
id: events-in-solidity
date: '2023-03-02'
image_alt: events in solidity
description: What are they? What are they for? How are the events used in Solidity?
image: /eventos-en-solidity.jpeg
---

In this article, we will use the terms "Events" and "Logs" to refer to the same concept. In Ethereum, one term or the other is preferred depending on the context (for example, "logs" in the EVM and "events" in Solidity). However, since both terms are interdependent and one is a consequence of the other, we will use them interchangeably to refer to the same thing.

## What are they?

In Solidity, events can be considered as an abstraction of the logs that the EVM uses to store information in an indexed data structure known as Bloom Filters[^1]. This structure enables efficient information retrieval, allowing light nodes (those that do not store the entire blockchain history) to query the logs.

## What are they for?

When writing a smart contract in Solidity, it is possible to declare and emit events. The question is, what are events for if we cannot subscribe to them from a contract or receive updates from other contracts that emit events?

Events in Solidity have the following syntax:

```solidity
contract MySmartContract {
  event UserRegistered(uint256 userId)
  event WinnerSelected(address indexed winnerAddress)

  function registerUser() public {
    emit UserRegistered(10);
  }

  function selectWinner() public {
    emit WinnerSelected(0x2d3052db3062d60643682b1272d00a6bf4a1f5e6);
  }
}
```

To declare events in Solidity, it is necessary to give them a name and define their parameters. Conventionally, the name of the function that emits the event is used, but reversed. To emit an event, simply call the `emit` function along with the name of the event and the defined parameters. It is important to note that some of the parameters may have the keyword `indexed`, while others may not. We will see the use of this in a later section.

Going back to the question, why do we want to emit events that we cannot subscribe to? The answer is that we want to subscribe to those events from **outside** the network. It is important to note that a blockchain network is like a closed circuit, and it is not possible to bring data from external sources as if it were an HTTP request, nor is it possible to send data to specific servers. It is true that you cannot subscribe directly to an event, as the network does not send you a notification that something has happened, but simply when an event occurs, the EVM adds that log to the node, which can then be queried in various ways.

## How to query them?

In this example, we will use the _[composer](https://composer.alchemy.com/)_ tool from Alchemy. As we know, nodes expose a JSON-RPC endpoint to which we can make POST requests. Specifically, we will use the `eth_getLogs` method to obtain logs belonging to a particular contract that has emitted an event. Initially, it is only mandatory to include the contract address as a parameter, but it is important to add the block range to avoid overloading the node by performing a very extensive search.

For example:

![compose example](/composer.webp)

This will result in something like this:

```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": [
    {
      "address": "0x62a6ef16f4c7605e89f6ebbc38dac89bc7aacd0b",
      "blockHash": "0x6df099a0fecc4d4cfae06b691aba295c7de3fde09ffa527eaa71920bbbe4ba35",
      "blockNumber": "0x81f06f",
      "data": "0x00000000000000000000000033ffcccda2a9f07ab03191ebdf8ec0ad5edc6ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000009d3052db3062d60643682b1272d00a6bf4a6f5e6",
      "logIndex": "0x37",
      "removed": false,
      "topics": ["0x5ba0ddd8e72e3c5c274414bd1ef0dec9ae5220e0f6f534d859043e2a52f0319f"],
      "transactionHash": "0xda633d761ae7683cb75de343ef6651daed5f8b78ce9d0e622345c4f392087a7c",
      "transactionIndex": "0x19"
    }
    // ...
  ]
}
```

At first glance, it is not readable, nor does it provide much... Later we will see use cases.

## Can we filter them?

Of course! In addition to the block range, you can add _topics_ to the query of the logs. Topics are an array that contains the arguments of the emitted event, but they are added in a specific format. For example, if we want to filter by the `UserRegistered` event, we should add to the topic the hash resulting from applying the keccak256 function to its canonical form[^2] (you can use [this](https://emn178.github.io/online-tools/keccak_256.html) tool to get the value).

```json
"topics": ["0x6b1da47e6cb6a4952c75fff4300f06caf20aa8269a4a398f315562926c5bed39"]
```

In addition to filtering by event names, we can also filter by the values of their arguments. This is where the `indexed` keyword we saw earlier comes into play. At most, you can have 3 indexed arguments, which means that these values will be added in hexadecimal format to the array of topics. In the case of `UserRegistered`, we couldn't use this functionality, as its argument is not indexed. However, in the `WinnerSelected` event, we could do it. To do this, we should add both the hash and the contract address to the corresponding topic, so the array of topics would be as follows:

```json
"topics":[
  // hash
  "0x1d4c260f1824cd028e6c9e6e31c3a0b94f2513e7a641113ec759d382f9bdd5a1",
  // address
  "0x0000000000000000000000002d3052db3062d60643682b1272d00a6bf4a1f5e6"
]
```

## Use cases

Solidity events are very useful for updating the user interface (UI) of a dApp[^3]. This is because, through libraries like _web3js_ or _ethers_, we can query logs through the provider[^4] and take real-time actions based on the received events. In this way, we can have an UI always updated with the latest information available on the blockchain.

For example:

```javascript
const filter = {
  // Let's assume this is the MySmartContract address
  address: '0x000...123',
  topics: [
    utils.id('WinnerSelected(address)'), // Applies keccak256 hashing function
  ],
};
provider.on(filter, (log, event) => {
  // This will run every time a WinnerSelected event is emitted
});
```

The truth is that filtering logs or making this type of queries to the network is not trivial. If we need to make queries with more complex filters, for example, we would first have to process and store the data in a specific database and then make queries in SQL, Mongo or another tool. Luckily, there is a solution to this problem: [The Graph](https://thegraph.com/en/).

Another use case is to store data in an external system to the contract or logs, where TheGraph is very useful. It is commonly used for **NFT marketplaces**, where it is necessary to maintain a list of NFTs that are for sale with certain properties (which implies preprocessing the data). To achieve this, we only need to emit events to buy or sell NFTs, without the need to store these lists in the contract, which would be more expensive.

To use The Graph, we simply provide the contract address and ABI[^5], and it takes care of constantly querying those events and executing a specific "mapper" function (defined by us) to save them to its node. Then, The Graph node exposes a GraphQL endpoint for us to query the aggregated data in whatever way we desire.

---

### Resources

- [Ethers provider methods](https://docs.ethers.org/v5/api/providers/provider/#Provider--inspection-methods)
- [TheGraph documentation](https://thegraph.com/docs/en/)
- [Playground keccak256](https://emn178.github.io/online-tools/keccak_256.html)
- [Composer](https://composer.alchemy.com/)
- [eth_getlogs documentation](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
- [Solidity events docs](https://docs.soliditylang.org/en/v0.4.24/contracts.html#events)

---

[^1]: Bloom Filters: [https://en.wikipedia.org/wiki/Bloom_filter](https://en.wikipedia.org/wiki/Bloom_filter)
[^2]: Canonical form: It means the function name followed by the parameter types. For example `function foo(boolean bar){}` would be `foo(boolean)`
[^3]: DAPP: Decentralized application.
[^4]: Provider: It's an abstraction of the connection to the Ethereum network. If you use web3js or ethers you can configure as provider Infura, Metamask, and Alchemy… among others.
[^5]: ABI: I'ts a JSON file that defines all the variables, functions and events written in a SmartContract
