/*
Querying Bridge Contracts on Source & Destination Chains
*/

const { ethers } = require("ethers")
const getTransactions = require("./utils/transactions").getTransactions

// Source Chain Data
SRC_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/"
SRC_BRIDGE = "0xB7D2303598AEc9E3249C52ed549f061152C3c535"
SRC_EVENT = "Deposit"
SRC_TOPIC = "event Deposit(uint8 indexed destinationChainID, bytes32 indexed resourceID, uint64 indexed depositNonce)"
SRC_BLOCK_RANGE = 5000

// Destination Chain Data
DST_RPC = "https://elysium-test-rpc.vulcanforged.com/"
DST_TOKEN = "0x98DdEfE7849887FC581dCbDfCa4e8033eE2a3094"
DST_EVENT = "Transfer"
DST_TOPIC = "event Transfer(address indexed from, address indexed to, uint256 value)"
DST_BLOCK_RANGE = 5000

async function main(){
    
    // initialise providers
    const src_prov = new ethers.providers.JsonRpcProvider(SRC_RPC)
    const dst_prov = new ethers.providers.JsonRpcProvider(DST_RPC)
    
    // get current block numbers
    const src_current = await src_prov.getBlockNumber()
    const dst_current = await dst_prov.getBlockNumber()
    console.info("Current Block on Source Chain: ",src_current)
    console.info("Current Block on Destination Chain: ",dst_current)

    // querying contract events on src chain
    const src_txns = await getTransactions("bridge",src_prov,SRC_BRIDGE,SRC_EVENT,SRC_TOPIC,src_current-SRC_BLOCK_RANGE,src_current)
    console.info(`Latest Transactions on Source Bridge: `,src_txns)
    const dst_txns = await getTransactions("erc20",dst_prov,DST_TOKEN,DST_EVENT,DST_TOPIC,dst_current-DST_BLOCK_RANGE,dst_current)
    console.info(`Latest Transactions on Destination Token: `,dst_txns)
}

main()
