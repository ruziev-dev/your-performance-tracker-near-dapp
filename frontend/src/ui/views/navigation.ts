import { useNavigate } from "react-router-dom";

export enum VIEWS {
  ROOT = "/",
  ADD_CHALLENGE = "/add_challenge",
  DEPOSIT = "/deposit",
  WITHDRAW = "/withdraw",
}

export const useNavigation = () => {
  const navigate = useNavigate();
  return {
    goHome: () => navigate(VIEWS.ROOT),
    goAddChallengeView: () => navigate(VIEWS.ADD_CHALLENGE),
    goDepositView: () => navigate(VIEWS.DEPOSIT),
    goWithdrawView: () => navigate(VIEWS.WITHDRAW),
  };
};
