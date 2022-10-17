# Your Performance Tracker NEAR dApp

Work example of contract

```js
class Contract {
  users: {
    "test_user.near": {
      hold: "amount of tokens",
      challenges: [
        {
          group_uuid: "",
          uuid: "",
          name: "Challenge 1 name",
          expiration: "Date",
          bet: "amount of tokens",
          executed: false,
          proof_type: "TEXT" | "MEDIA" | "NONE",
          proof_data: "",
          ipfs: "",
        }
      ],
    },
  };
}
```

# Quickstart

## 1. Build and Deploy the Contract

You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
./deploy.sh
```

Once finished, check the `neardev/dev-account` file to find the address in which the contract was deployed:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<br />

## 2. Retrieve the Greeting

`get_greeting` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the greeting
near view <dev-account> get_greeting
```


**Tip:** If you would like to call `set_greeting` using your own account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account>`.
