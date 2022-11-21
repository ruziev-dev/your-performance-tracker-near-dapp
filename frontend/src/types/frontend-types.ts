import { AlertColor } from "@mui/material";
import { PROOF_TYPE } from "../near/contract";
import { Challenge, NearBalance } from "./contract-entities";

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
  expiration: number;
}

export enum APP_MODAL_TYPE {
  INPUT_PROOF_FORM,
  SHOW_PROOF_DATA,
}

export interface AppModal {
  viewType: APP_MODAL_TYPE;
  challenge: Challenge;
  title: string;
  subtitle: string;
  proofData: string;
  contentType?: "text" | "media";
  actionName: string;
}
