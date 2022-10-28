import { Divider, ListItem, ListItemText } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import { Challenge } from "../../types/contract-entities";
import { ActionButton } from "../atoms/ActionButton";
import { DisplayText } from "../atoms/DisplayText";
import { LocChip } from "../atoms/LocChip";
import { toNear } from "../../utils/helpers";

export const ChallengesHeader: React.FC = ({}) => {
  return (
    <ListItem>
      <ListItemText sx={{ width: 300 }}>
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

interface Props extends Challenge {
  onComplete: () => void;
  isLoading: boolean;
}

export const ChallengeItem: React.FC<Props> = ({
  uuid,
  name,
  bet,
  complete_date,
  expiration_date,
  onComplete,
  executed,
  isLoading,
}) => {
  return (
    <React.Fragment>
      <Divider />
      <ListItem sx={{ height: 65 }}>
        <ListItemText sx={{ width: 300 }}>{name}</ListItemText>
        <ListItemText sx={{ width: 100 }}>{toNear(bet)} Ⓝ</ListItemText>
        <ListItemText sx={{ width: 80 }}>
          {executed ? (
            dayjs(expiration_date).format("D MMMM YYYY")
          ) : (
            <Countdown date={new Date(expiration_date)} renderer={renderer} />
          )}
        </ListItemText>
        <ListItemText sx={{ width: 100 }}>
          {executed ? (
            <LocChip
              text={`Completed ${dayjs(complete_date).format("DD/MM/YY")}`}
              color="primary"
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

const formatWithZero = (value: number) => (value < 10 ? `0${value}` : value);
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <DisplayText>You lose 😔</DisplayText>;
  } else {
    const dayStr = days === 1 ? `${days} day` : `${days} days`;

    return (
      <div>
        <p>{!!days && dayStr}</p>
        {formatWithZero(hours)}:{formatWithZero(minutes)}:
        {formatWithZero(seconds)}
      </div>
    );
  }
};
