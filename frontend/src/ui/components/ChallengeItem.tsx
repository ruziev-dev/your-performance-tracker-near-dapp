import { Divider, ListItem, ListItemText } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import { Challenge } from "../../types/contract-entities";
import { ActionButton } from "../atoms/ActionButton";
import { DisplayText } from "../atoms/DisplayText";

export const ChallengesHeader: React.FC = () => {
  return (
    <ListItem>
      <ListItemText sx={{ width: 300 }}>
        <DisplayText>Name</DisplayText>
      </ListItemText>
      <ListItemText sx={{ width: 100 }}>
        <DisplayText>Bet</DisplayText>
      </ListItemText>
      <ListItemText sx={{ width: 100 }}>
        <DisplayText>Deadline after</DisplayText>
      </ListItemText>
      <ListItemText sx={{ width: 80 }}></ListItemText>
    </ListItem>
  );
};

export const ChallengeItem: React.FC<Challenge & { onComplete: Function }> = ({
  uuid,
  name,
  bet,
  expiration_date,
  onComplete,
}) => {
  const restTime = dayjs(expiration_date).diff(Date(), "day");
  return (
    <React.Fragment>
      <Divider />
      <ListItem>
        <ListItemText sx={{ width: 300 }}>{name}</ListItemText>
        <ListItemText sx={{ width: 100 }}>{bet} Ⓝ</ListItemText>
        <ListItemText sx={{ width: 80 }}>
          <Countdown date={new Date(expiration_date)} renderer={renderer} />
        </ListItemText>
        <ListItemText sx={{ width: 100 }}>
          <ActionButton
            title="PROOF FINISHING"
            sx={{ width: "100%" }}
            onClick={onComplete}
          />
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
