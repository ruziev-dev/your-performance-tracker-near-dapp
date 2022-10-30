#[cfg(test)]
mod tests {
    use near_sdk::{Balance, testing_env, Timestamp};
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use serde_json::{Map, Value};

    use crate::Contract;

    const NEAR: u128 = 1000000000000000000000000;
    const TEST_CHALLENGE: &str = "Run 10km";
    const TEST_CHALLENGE_UUID: &str = "eab4c69e-4cee-4489-9deb-130f1d9e22c9";
    const TEST_GROUP_UUID: &str = "jfw4c69e-4cee-4489-9deb-130f1d9e2f35";
    const TEST_TIMESTAMP: Timestamp = 10_000;


    #[test]
    fn add_user_check_total_hold_balance() {
        let test_balance = Balance::from(5 * NEAR);
        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .attached_deposit(test_balance)
            .build();
        testing_env!(context.clone());
        let mut contract = Contract::default();
        contract.add_user_holding_tokens();
        let user = contract.users.get(&accounts(0).to_string()).unwrap();
        assert_eq!(user.total_hold, test_balance);
    }


    #[test]
    fn add_user_check_free_hold_balance() {
        let test_balance = Balance::from(100 * NEAR);
        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .attached_deposit(test_balance)
            .build();
        testing_env!(context.clone());
        let mut contract = Contract::default();
        contract.add_user_holding_tokens();
        let user = contract.users.get(&accounts(0).to_string()).unwrap();
        assert_eq!(user.free_hold, test_balance);
    }

    #[test]
    #[should_panic]
    // panic msg: "Your account hasn't held any deposit. Use add_user_holding_tokens() contract call"
    fn add_challenge_deposit_check_panic() {
        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .build();

        testing_env!(context.clone());
        let mut contract = Contract::default();
        let args: Map<String, Value> = Map::default();

        contract.add_challenge(args);
    }

    #[test]
    #[should_panic]
    // panic msg: "Fields group_uuid,uuid,name,expiration_date are required"
    fn add_challenge_required_fields_panic() {

        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .attached_deposit(5 * NEAR)
            .build();
        testing_env!(context.clone());
        let mut contract = Contract::default();
        contract.add_user_holding_tokens();

        let args: Map<String, Value> = Map::default();

        contract.add_challenge(args);
    }


    #[test]
    #[should_panic]
    // panic msg: "Not enough hold balance"
    fn add_challenge_with_bet_over_deposit() {
        let mut contract = get_prepared_contract();

        let mut args: Map<String, Value> = Map::default();
        args.insert("uuid".to_string(), Value::from("test_uuid".to_string()));
        args.insert("name".to_string(), Value::from(TEST_CHALLENGE.to_string()));
        args.insert("expiration_date".to_string(), Value::from(TEST_TIMESTAMP));
        args.insert("group_uuid".to_string(), Value::from("test_uuid".to_string()));
        args.insert("bet".to_string(), Value::from((20 * NEAR).to_string()));

        contract.add_challenge(args);

    }


    #[test]
    #[should_panic]
    // panic msg: "Not enough hold balance"
    fn add_challenge_with_bet_over_deposit1() {
        let mut contract = get_prepared_contract();

        let mut args: Map<String, Value> = Map::default();
        args.insert("uuid".to_string(), Value::from("test_uuid".to_string()));
        args.insert("name".to_string(), Value::from(TEST_CHALLENGE.to_string()));
        args.insert("expiration_date".to_string(), Value::from(TEST_TIMESTAMP));
        args.insert("group_uuid".to_string(), Value::from("test_uuid".to_string()));
        args.insert("bet".to_string(), Value::from((20 * NEAR).to_string()));

        contract.add_challenge(args);

    }

    fn get_prepared_contract() -> Contract {

        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .attached_deposit(10 * NEAR)
            .build();
        testing_env!(context.clone());
        let mut contract = Contract::default();

        contract.add_user_holding_tokens();

        let mut args: Map<String, Value> = Map::default();
        args.insert("uuid".to_string(), Value::from(TEST_CHALLENGE_UUID.to_string()));
        args.insert("name".to_string(), Value::from(TEST_CHALLENGE.to_string()));
        args.insert("expiration_date".to_string(), Value::from(TEST_TIMESTAMP));
        args.insert("group_uuid".to_string(), Value::from(TEST_GROUP_UUID.to_string()));
        args.insert("bet".to_string(), Value::from((5 * NEAR).to_string()));

        contract.add_challenge(args);

        contract
    }
}