const bridge_abi = require("../abis/Bridge.json").abi
const erc20handler_abi = require("../abis/ERC20Handler.json").abi
const erc20_abi = require("../abis/ERC20.json").abi

const { ethers } = require("ethers")

exports.getTransactions = async(contract_type,provider,address,event_name,event_topic,from_block,to_block) => {
    // fetch all transactions on the bridge contract
    // to fetch txns we need events
    // we fetch Deposit or Withdraw events
    var abi = []
    switch(contract_type){
        case "bridge":
            abi = bridge_abi
            break
        case "erc20handler":
            abi = erc20handler_abi
            break
        case "erc20":
            abi = erc20_abi
            break
        default:
            abi = []
    }
    const iface = new ethers.utils.Interface(abi)
    const contract  = new ethers.Contract(address,[event_topic],provider)
    const filter = iface.getEventTopic(event_name)
    const _txns = await contract.queryFilter(filter,from_block,to_block)
    const txns = []
    for (var _txn of _txns){
        const {transactionHash} = _txn
        const txn = await provider.getTransaction(transactionHash)
        txns.push(txn)
    }
    console.info(`${txns.length} txns found between blocks ${from_block} - ${to_block} on ${contract_type} contract ${address}`)
    return txns
}