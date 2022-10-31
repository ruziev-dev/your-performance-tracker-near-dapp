#[cfg(test)]
mod tests {
    use near_sdk::{Balance, log, testing_env, Timestamp};
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use serde_json::{Map, Value};

    use crate::Contract;

    const NEAR: u128 = 1000000000000000000000000;
    const TEST_CHALLENGE: &str = "Run 10km";
    const TEST_CHALLENGE_UUID: &str = "eab4c69e-4cee-4489-9deb-130f1d9e22c9";
    const TEST_GROUP_UUID: &str = "jfw4c69e-4cee-4489-9deb-130f1d9e2f35";
    const TEST_EXPIRATION_TIMESTAMP: Timestamp = 10_000;


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
        assert_eq!(user.free_hold, test_balance);
    }

    #[test]
    fn add_user_check_repeat_deposit() {
        let test_balance = Balance::from(10 * NEAR);
        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .attached_deposit(test_balance)
            .build();
        testing_env!(context.clone());

        let mut contract = get_prepared_contract();
        let user_old = contract.users.get(&accounts(0).to_string()).unwrap();
        let old_total_hold = user_old.total_hold;
        let old_free_hold = user_old.free_hold;

        log!("OLD: free_hold: {}, total_hold: {}", user_old.free_hold, user_old.total_hold);
        contract.add_user_holding_tokens();

        let user = contract.users.get(&accounts(0).to_string()).unwrap();
        log!("NEW: free_hold: {}, total_hold: {}", user.free_hold, user.total_hold);

        let user = contract.users.get(&accounts(0).to_string()).unwrap();
        assert_eq!(user.free_hold, test_balance + old_free_hold);
        assert_eq!(user.total_hold, test_balance + old_total_hold);
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
        args.insert("expiration_date".to_string(), Value::from(TEST_EXPIRATION_TIMESTAMP));
        args.insert("group_uuid".to_string(), Value::from("test_uuid".to_string()));
        args.insert("bet".to_string(), Value::from((20 * NEAR).to_string()));

        contract.add_challenge(args);
    }

    #[test]
    fn complete_challenge_default() {
        let mut contract = get_prepared_contract();

        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .block_timestamp(TEST_EXPIRATION_TIMESTAMP - 1000)
            .build();

        testing_env!(context.clone());

        contract.complete_challenge(TEST_CHALLENGE_UUID.to_string());
    }

    #[test]
    #[should_panic]
    // panic msg: "There is not data for account danny"
    fn complete_challenge_another_user_panic() {
        let mut contract = get_prepared_contract();
        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(3))
            .block_timestamp(TEST_EXPIRATION_TIMESTAMP - 1000)
            .build();

        testing_env!(context.clone());


        contract.complete_challenge(TEST_CHALLENGE_UUID.to_string());
    }

    #[test]
    fn complete_challenge_out_of_time() {
        let mut contract = get_prepared_contract();

        let executed_timestamp: Timestamp = TEST_EXPIRATION_TIMESTAMP / 1_000_000 + 100_000_000_000;
        let context = VMContextBuilder::new()
            .predecessor_account_id(accounts(0))
            .block_timestamp(executed_timestamp)
            .build();

        testing_env!(context.clone());

        contract.complete_challenge(TEST_CHALLENGE_UUID.to_string());

        let user_new_state = contract.users
            .get(&accounts(0).to_string())
            .unwrap();

        let new_challenge_state = user_new_state.challenges
            .get(&TEST_CHALLENGE_UUID.to_string())
            .unwrap();

        log!("New state: {:?}", new_challenge_state);

        assert_eq!(new_challenge_state.wasted, true);
        assert_eq!(new_challenge_state.executed, false);

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
        args.insert("expiration_date".to_string(), Value::from(TEST_EXPIRATION_TIMESTAMP));
        args.insert("group_uuid".to_string(), Value::from(TEST_GROUP_UUID.to_string()));
        args.insert("bet".to_string(), Value::from((5 * NEAR).to_string()));

        contract.add_challenge(args);

        contract
    }
}