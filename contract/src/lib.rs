extern crate core;

mod app_challenge;
mod app_user;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen, env};
use near_sdk::collections::{LookupMap, Vector};
use crate::app_challenge::{Challenge, ProofType};
use crate::app_user::User;


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
    #[payable]
    pub fn add_user_holding_tokens(&mut self) {
        let account_name = env::predecessor_account_id().to_string();
        let deposit = env::attached_deposit();
        let account_previous_data = self.users.get(&account_name);
        let mut user = User {
            hold: deposit,
            challenges: Vector::new(b"m"),
        };

        match account_previous_data {
            Some(user_data) => {
                user.hold = &user.hold + &user_data.hold;
                if user_data.challenges.len() > 0 {
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
            user.hold
        );
    }


    pub fn add_challenge(&mut self) {
        let account_name = env::predecessor_account_id().to_string();
        let mut user = self.users
            .get(&account_name)
            .expect("Your account hasn't held any deposit. Use add_user_holding_tokens() contract call");


        let challenge = Challenge {
            group_uuid: "123456".to_string(),
            name: "".to_string(),
            uuid: "124314343".to_string(),
            expiration_date: "3455".to_string(),
            bet: 0,
            executed: false,
            proof_type: ProofType::NONE,
            proof_data: "".to_string(),
        };


        log!("Challenge {:?} has been added to user {}",challenge, account_name);
        user.challenges.push(&challenge);
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