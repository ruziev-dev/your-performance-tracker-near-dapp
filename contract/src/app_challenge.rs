use near_sdk::Balance;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use strum_macros::{Display};
use near_sdk::serde::Serialize;


#[derive(BorshDeserialize, BorshSerialize, Display,Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum ProofType {
    NONE = 0,
    TEXT = 1,
    MEDIA = 2,
}


#[derive(BorshDeserialize, BorshSerialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Challenge {
    pub group_uuid: String,
    pub name: String,
    pub expiration_date: String,
    pub bet: Balance,
    pub executed: bool,
    pub proof_type: ProofType,
    pub proof_data: String,
}

impl Default for Challenge {
    fn default() -> Self {
        Self {
            group_uuid: "".to_string(),
            name: "".to_string(),
            expiration_date: "".to_string(),
            bet: 0,
            executed: false,
            proof_type: ProofType::NONE,
            proof_data: "".to_string()
        }
    }
}