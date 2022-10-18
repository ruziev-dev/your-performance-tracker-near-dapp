use near_sdk::Balance;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::Vector;
use crate::app_challenge::Challenge;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct User {
    pub hold: Balance,
    pub challenges: Vector<Challenge>,
}