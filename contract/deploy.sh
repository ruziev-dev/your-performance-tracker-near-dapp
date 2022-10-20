#!/bin/sh
export WASM_PATH="./target/wasm32-unknown-unknown/release/your_performance_tracker.wasm"
export CONTRACT_NAME="contract_1.ruziev_dev.testnet"

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"


# https://docs.near.org/tools/near-cli#near-dev-deploy
near dev-deploy --wasmFile $WASM_PATH # --initFunction new --initArgs '{}'
#near deploy --accountId $CONTRACT_NAME --wasmFile $WASM_PATH --initFunction new --initArgs '{}'