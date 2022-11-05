import { Divider, ListItem, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import { Challenge } from "../../types/contract-entities";
import { ActionButton } from "../atoms/ActionButton";
import { DisplayText } from "../atoms/DisplayText";
import { LocChip } from "../atoms/LocChip";
import { formatTimeWithZero, toNear } from "../../utils/helpers";
import store from "../../store/store";
import { Box } from "@mui/system";
import { ProofPicture } from "../atoms/ProofPicture";

export const ChallengesHeader: React.FC = ({}) => {
  return (
    <ListItem>
      <ListItemText sx={{ width: 300, pl: 7 }}>
        <DisplayText>Name</DisplayText>
      </ListItemText>
      <ListItemText sx={{ width: 100 }}>
        <DisplayText>Bet</DisplayText>
      </ListItemText>
      <ListItemText sx={{ width: 100 }}>
        <DisplayText>Deadline</DisplayText>
      </ListItemText>
      <ListItemText sx={{ width: 80 }}></ListItemText>
    </ListItem>
  );
};

interface Props {
  challenge: Challenge;
  onComplete?: () => void;
  isLoading: boolean;
}

export const ChallengeItem: React.FC<Props> = ({
  challenge,
  onComplete,
  isLoading,
}) => {
  const {
    executed,
    wasted,
    proof_type,
    proof_data,
    bet,
    expiration_date,
    complete_date,
    uuid,
    name,
  } = challenge;
  const isEnded = executed || wasted;
  return (
    <React.Fragment>
      <Divider />
      <ListItem
        onClick={() => isEnded && store.showProofModal(challenge)}
        sx={{
          height: 65,
          ":hover": isEnded ? { bgcolor: "rgba(128, 128, 128, .25)" } : null,
        }}
      >
        <ListItemText sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ProofPicture
              proofType={proof_type}
              proofData={proof_data}
              isEnded={isEnded}
              wasted={wasted}
            />
            {name}
          </Box>
        </ListItemText>
        <ListItemText sx={{ width: 100 }}>{toNear(bet)} Ⓝ</ListItemText>
        <ListItemText sx={{ width: 80 }}>
          {isEnded ? (
            dayjs(expiration_date).format("D MMM YYYY")
          ) : (
            <Countdown
              date={new Date(expiration_date)}
              renderer={(props) => (
                <TimeRenderer {...props} wasted={wasted} uuid={uuid} />
              )}
            />
          )}
        </ListItemText>
        <ListItemText sx={{ width: 100 }}>
          {isEnded ? (
            <LocChip
              text={
                wasted
                  ? "WASTED"
                  : `Completed ${dayjs(complete_date).format("DD/MM/YY")}`
              }
              color={wasted ? "error" : "primary"}
              sx={{ width: "100%" }}
            />
          ) : (
            <ActionButton
              isLoading={isLoading}
              title="PROOF FINISHING"
              sx={{ width: "100%" }}
              onClick={onComplete}
            />
          )}
        </ListItemText>
      </ListItem>
    </React.Fragment>
  );
};

const TimeRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  wasted,
  uuid,
}) => {
  useEffect(() => {
    if (completed && !wasted) {
      setTimeout(() => store.completeChallenge(uuid), 2000);
    }
  }, [completed]);

  if (completed) {
    return <DisplayText>You lose 😔</DisplayText>;
  } else {
    const dayStr = days === 1 ? `${days} day` : `${days} days`;

    return (
      <div>
        <p>{!!days && dayStr}</p>
        {formatTimeWithZero(hours)}:{formatTimeWithZero(minutes)}:
        {formatTimeWithZero(seconds)}
      </div>
    );
  }
};
