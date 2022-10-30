#!/bin/sh
export CONTRACT_NAME="contract_5.ruziev_dev.testnet"
export CONTRACT_OWNER="ruziev_dev.testnet"


echo ">> Testing contract"

near call $CONTRACT_NAME migrate  --accountId $CONTRACT_NAME

echo ">> Request contract state"

near view-state $CONTRACT_NAME --utf8 --finality optimistic
