import { PROOF_TYPE } from "../near/contract";

export type NearBalance = string;

export interface User {
  total_hold: NearBalance;
  free_hold: NearBalance;
  challenges: Challenge[];
}

export interface Challenge {
  isEnded?: boolean
  group_uuid: string;
  uuid: string;
  name: string;
  expiration_date: number;
  complete_date?: number;
  bet: NearBalance;
  executed?: boolean;
  wasted?: boolean;
  proof_type: PROOF_TYPE;
  proof_data?: string;
}
