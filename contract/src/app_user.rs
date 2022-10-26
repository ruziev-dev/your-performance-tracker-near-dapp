use near_sdk::Balance;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::TreeMap;
use near_sdk::serde::{Serialize, Serializer};
use near_sdk::serde::ser::SerializeStruct;

use crate::app_challenge::Challenge;

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct User {
    pub total_hold: Balance,
    pub free_hold: Balance,
    pub challenges: TreeMap<String, Challenge>,
}

impl Serialize for User {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer {
        let mut user = serializer.serialize_struct("User", 3)?;
        user.serialize_field("total_hold", &format!("{:?}", self.total_hold)).unwrap();
        user.serialize_field("free_hold", &format!("{:?}", self.free_hold)).unwrap();
        user.serialize_field::<Vec<Challenge>>("challenges", &self.challenges
            .iter()
            .map(|(_key, ch)| ch)
            .collect(),
        ).unwrap();

        user.end()
    }
}