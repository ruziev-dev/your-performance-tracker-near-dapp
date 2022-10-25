import { AlertColor } from "@mui/material";
import { PROOF_TYPE } from "../near/contract";
import { NearBalance } from "./contract-entities";

export interface IAlert {
  key: string;
  message: string;
  type: AlertColor;
  title: string;
}

export interface INewChallenge {
  proofType: PROOF_TYPE;
  name: string;
  bet: NearBalance;
  expiration: string;
}
