use near_sdk::Balance;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use strum_macros::{Display};

#[derive(BorshDeserialize, BorshSerialize, Display, Debug)]
pub enum ProofType {
    NONE = 0,
    TEXT = 1,
    MEDIA = 2,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Challenge {
    pub(crate) group_uuid: String,
    pub(crate) name: String,
    pub(crate) uuid: String,
    pub(crate) expiration_date: String,
    pub(crate) bet: Balance,
    pub(crate) executed: bool,
    pub(crate) proof_type: ProofType,
    pub(crate) proof_data: String,
}