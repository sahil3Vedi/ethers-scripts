/*
Checking Blockwise Contract Activity
Usage: node check_block.js from_block_offset to_block_offset
*/

const { ethers } = require("ethers")

// Source Chain Data
SRC_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/"
SRC_BRIDGE = "0xB7D2303598AEc9E3249C52ed549f061152C3c535"
SRC_EVENT = "Deposit"
SRC_TOPIC = "event Deposit(uint8 indexed destinationChainID, bytes32 indexed resourceID, uint64 indexed depositNonce)"
SRC_BLOCK_RANGE = 5000

// Destination Chain Data
DST_RPC = "https://elysium-test-rpc.vulcanforged.com/"
DST_TOKEN = "0x98DdEfE7849887FC581dCbDfCa4e8033eE2a3094"
DST_BRIDGE = "0x7330AE0B721Bc4bB08FF417B5277C8fE997ea25c"
DST_EVENT = "ProposalEvent"
DST_TOPIC = "event ProposalEvent(uint8 indexed originChainID, uint64 indexed depositNonce, uint8 indexed status, bytes32 resourceID, bytes32 dataHash)"
DST_BLOCK_RANGE = 5000

async function main(){

    // initialise providers
    const src_prov = new ethers.providers.JsonRpcProvider(SRC_RPC)
    const dst_prov = new ethers.providers.JsonRpcProvider(DST_RPC)

    console.log(process.argv)

    // for a range of blocks
    const dst_to_block = 3560800
    const dst_from_block = 3560750
    for (var block_number = dst_from_block; block_number <= dst_to_block; block_number++){
        console.log((block_number-dst_from_block)/(dst_to_block - dst_from_block))
        // get list of transactions inside the block
        const { transactions } = await dst_prov.getBlock(block_number)
        if (transactions.length){
            console.log(`transactions detected!:`,transactions)
        }
    }

}

main()