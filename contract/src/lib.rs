

use near_sdk::{Balance, env, log, near_bindgen, Promise};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, TreeMap};
use serde_json::Value;

use crate::app_challenge::{Challenge, ProofType};
use crate::app_user::User;

mod app_challenge;
mod app_user;
mod utils;
mod tests;


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

                if !user_data.challenges.is_empty() {
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
            Some(value) => {
                challenge.group_uuid = value.as_str().unwrap().parse().unwrap();
            }
            None => {
                errors_buffer_message.push("group_uuid".to_string());
            }
        }

        match args.get("uuid") {
            Some(value) => {
                uuid = value.as_str().unwrap().parse().unwrap();
                challenge.uuid = uuid.clone();
            }
            None => { errors_buffer_message.push("uuid".to_string()) }
        }

        match args.get("name") {
            Some(value) => {
                challenge.name = value.as_str().unwrap().parse().unwrap();
            }
            None => { errors_buffer_message.push("name".to_string()) }
        }

        match args.get("expiration_date") {
            Some(value) => {
                challenge.expiration_date = value.as_u64().unwrap();
            }
            None => { errors_buffer_message.push("expiration_date".to_string()) }
        }

        if errors_buffer_message.len() > 0 {
            panic!("Fields {} are required", errors_buffer_message.join(","));
        }

        let bet_arg = args.get("bet").unwrap();
        let string_bet_value: String = bet_arg.as_str().unwrap().parse().unwrap();
        let new_bet = string_bet_value.parse::<Balance>().unwrap();

        if new_bet <= user.free_hold {
            challenge.bet = new_bet;
            user.free_hold = user.free_hold - new_bet;
        } else { panic!("Not enough hold balance") }


        let proof_type = args.get("proof_type").unwrap();
        if proof_type.is_number() {
            if proof_type.eq(&1) {
                challenge.proof_type = ProofType::TEXT
            } else if proof_type.eq(&2) {
                challenge.proof_type = ProofType::MEDIA
            }
        }


        user.challenges.insert(&uuid.to_string(), &challenge);

        self.users.insert(&account_name, &user);
        log!("{:?} has been added to user {}", challenge, account_name);
    }

    pub fn withdraw_free_hold(&mut self, amount: String) {
        let balance = amount.parse::<Balance>().unwrap();
        let account_name = env::predecessor_account_id();

        let error_msg = format!(
            "There is not data about account {:?} in the smart contract",
            account_name
        );
        let mut account_previous_data = self.users
            .get(&account_name.to_string())
            .expect(&error_msg);

        if balance > account_previous_data.free_hold {
            panic!("You try to get more value that your free hold balance")
        } else {
            Promise::new(env::predecessor_account_id()).transfer(Balance::from(balance));
            account_previous_data.free_hold = account_previous_data.free_hold - balance;
            account_previous_data.total_hold = account_previous_data.total_hold - balance;
            self.users.insert(&account_name.to_string(), &account_previous_data);
        }
    }

    pub fn complete_challenge(&mut self, uuid: String, proof_data: Option<String>) {
        let account_name = env::predecessor_account_id().to_string();
        let mut user = self.users
            .get(&account_name)
            .expect(&format!("There is not data for account {}", account_name));

        let mut challenge = user.challenges
            .get(&uuid)
            .expect("There is not challenge with such UUID");

        if challenge.executed {
            panic!("The challenge is already completed");
        } else if challenge.wasted { panic!("The challenge is already wasted"); }

        let current_time = env::block_timestamp() / 1_000_000;

        if current_time < challenge.expiration_date {
            challenge.executed = true;
            user.free_hold = user.free_hold + challenge.bet;

            match challenge.proof_type {
                ProofType::TEXT => {
                    match proof_data {
                        None => panic!("You have to add proof_data field to finish challenge"),
                        Some(data) => { challenge.proof_data = data }
                    }
                }
                ProofType::MEDIA => {
                    match proof_data {
                        None => panic!("You have to add proof_data field to finish challenge"),
                        Some(data) => { challenge.proof_data = data }
                    }
                }
                ProofType::NONE => {}
            }
        } else {
            challenge.wasted = true;
            user.total_hold = user.total_hold - challenge.bet;
        }

        challenge.complete_date = current_time;


        user.challenges.insert(&uuid, &challenge);
        self.users.insert(&account_name, &user);
    }
}