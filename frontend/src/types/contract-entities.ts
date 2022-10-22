export type NearBalance = string;

export interface User {
  total_hold: NearBalance;
  free_hold: NearBalance;
  challenges: Challange[];
}

export interface Challange {}
