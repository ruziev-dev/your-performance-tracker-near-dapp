use near_sdk::{Balance, Timestamp};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize};

use crate::utils::u128_dec_format;
use serde_repr::{Serialize_repr, Deserialize_repr};


#[derive(Serialize_repr, BorshSerialize, BorshDeserialize, Deserialize_repr, PartialEq, Debug)]
#[repr(u8)]
pub enum ProofType {
    NONE = 0,
    TEXT = 1,
    MEDIA = 2,
}


#[derive(BorshSerialize, BorshDeserialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Challenge {
    pub group_uuid: String,
    pub uuid: String,
    pub name: String,
    pub expiration_date: Timestamp,
    pub complete_date: Timestamp,
    #[serde(with = "u128_dec_format")]
    pub bet: Balance,
    pub executed: bool,
    pub wasted: bool,
    pub proof_type: ProofType,
    pub proof_data: String,
}

impl Default for Challenge {
    fn default() -> Self {
        Self {
            group_uuid: "".to_string(),
            uuid: "".to_string(),
            name: "".to_string(),
            expiration_date: Timestamp::default(),
            complete_date: Timestamp::default(),
            bet: Balance::default(),
            executed: false,
            wasted: false,
            proof_type: ProofType::NONE,
            proof_data: "".to_string(),
        }
    }
}