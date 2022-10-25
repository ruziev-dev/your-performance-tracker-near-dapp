import { PROOF_TYPE } from "../near/contract";

export type NearBalance = string;

export interface User {
  total_hold: NearBalance;
  free_hold: NearBalance;
  challenges: Challange[];
}

export interface Challange {
  group_uuid: string;
  uuid: string;
  name: string;
  expiration_date: string;
  bet: NearBalance;
  executed?: boolean;
  proof_type: PROOF_TYPE;
  proof_data?: string;
  ipfs?: string;
}
