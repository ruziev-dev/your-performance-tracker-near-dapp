extern crate core;

use near_sdk::{Balance, env, log, near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, TreeMap};
use serde_json::Value;

use crate::app_challenge::Challenge;
use crate::app_user::User;

mod app_challenge;
mod app_user;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub users: LookupMap<String, User>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            users: LookupMap::new(b"m")
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn get_user_account(self, account_name: String) -> User {
        self.users
            .get(&account_name)
            .expect(&format!("Account {} hasn't been founded, call method add_user_holding_tokens to add account", &account_name))
    }

    #[payable]
    pub fn add_user_holding_tokens(&mut self) {
        let account_name = env::predecessor_account_id().to_string();
        let deposit = env::attached_deposit();
        let account_previous_data = self.users.get(&account_name);
        let mut user = User {
            total_hold: deposit,
            free_hold: deposit,
            challenges: TreeMap::new(b"m"),
        };

        match account_previous_data {
            Some(user_data) => {
                user.total_hold = &user.total_hold + &user_data.total_hold;
                user.free_hold = &user.free_hold + &user_data.free_hold;

                if user_data.challenges.is_empty() {
                    user.challenges = user_data.challenges;
                }
            }
            _ => ()
        }

        self.users.insert(&account_name, &user);
        log!(
            "User {} call method add_user_hold with deposit {:?}, total hold: {:?}",
            account_name,
            deposit,
            user.total_hold
        );
    }


    pub fn add_challenge(&mut self, args: serde_json::Map<String, Value>) {
        let account_name = env::predecessor_account_id().to_string();
        let mut user = self.users
            .get(&account_name)
            .expect("Your account hasn't held any deposit. Use add_user_holding_tokens() contract call");

        let mut errors_buffer_message: Vec<String> = Vec::new();

        let mut uuid = "".to_string();
        let mut challenge = Challenge::default();

        match args.get("group_uuid") {
            Some(value) => { challenge.group_uuid = value.as_str().unwrap().parse().unwrap() }
            None => { errors_buffer_message.push("group_uuid".to_string()) }
        }

        match args.get("uuid") {
            Some(value) => { uuid = value.as_str().unwrap().parse().unwrap() }
            None => { errors_buffer_message.push("uuid".to_string()) }
        }

        match args.get("name") {
            Some(value) => { challenge.name = value.as_str().unwrap().parse().unwrap() }
            None => { errors_buffer_message.push("name".to_string()) }
        }

        match args.get("expiration_date") {
            Some(value) => { challenge.expiration_date = value.as_str().unwrap().parse().unwrap() }
            None => { errors_buffer_message.push("expiration_date".to_string()) }
        }

        if errors_buffer_message.len() > 0 {
            panic!("Fields {} are required", errors_buffer_message.join(","))
        }

        let bet_arg = args.get("bet").unwrap();
        let string_bet_value: String = bet_arg.as_str().unwrap().parse().unwrap();
        let new_bet = Balance::from(string_bet_value.parse::<u128>().unwrap());

        if new_bet <= user.free_hold { challenge.bet = user.free_hold } else { panic!("Not enough hold balance") }


        user.challenges.insert(&uuid.to_string(), &challenge);
        log!("{:?} has been added to user {}", challenge, account_name);
    }
}

#[cfg(test)]
mod tests {
    //use near_sdk::testing_env;
    //use super::*;

    /* #[test]
     fn add_user_holding_tokens() {
         let mut contract = Contract::default();
         let user_account = "test_user.near".to_string();
         &contract.add_user_holding_tokens(user_account);
         println!("{:?}", contract.users.get(&user_account).unwrap().hold);
         assert_eq!(&user_account, &user_account);
     }*/
}