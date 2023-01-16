/*
Decode a txn
*/

const { ethers } = require("ethers")
const erc20abi = require("./abis/ERC20.json").abi

// Destination Chain Data
DST_RPC = "https://elysium-test-rpc.vulcanforged.com/"
DST_TOKEN = "0x98DdEfE7849887FC581dCbDfCa4e8033eE2a3094"
DST_BRIDGE = "0x7330AE0B721Bc4bB08FF417B5277C8fE997ea25c"
DST_EVENT = "ProposalEvent"
DST_TOPIC = "event ProposalEvent(uint8 indexed originChainID, uint64 indexed depositNonce, uint8 indexed status, bytes32 resourceID, bytes32 dataHash)"
DST_BLOCK_RANGE = 5000
TXN_HASH = "0xad922218227a00f3e408be9fdc5fb85775e01fa713b04e082d5c8ac42e08b2d1"

async function main(){

    // initialise providers
    // const src_prov = new ethers.providers.JsonRpcProvider(SRC_RPC)
    const dst_prov = new ethers.providers.JsonRpcProvider(DST_RPC)

    const {logs} = await dst_prov.getTransactionReceipt(TXN_HASH)
    const {data,value} = await dst_prov.getTransaction(TXN_HASH)

    const iface = new ethers.utils.Interface(erc20abi)
    const log = logs[0]
    
    console.log("Trying to parse log...")
    try{
        const decodedLog = iface.parseLog(log)
        console.log(decodedLog)
    } catch (e) {
        console.log(e)
    }
    console.log("...")
    console.log("")

    console.log("Trying to parse txn...")
    try{
        const decodedInput = iface.parseTransaction({
            data,value
        })
        console.log(decodedInput)
    } catch (e) {
        console.log(e)
    }
    console.log("...")
    console.log("")

    console.log(logs)
}

main()