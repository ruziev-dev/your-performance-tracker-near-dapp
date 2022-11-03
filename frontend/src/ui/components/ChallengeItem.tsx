import { Avatar, Divider, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import { Challenge } from "../../types/contract-entities";
import { ActionButton } from "../atoms/ActionButton";
import { DisplayText } from "../atoms/DisplayText";
import { LocChip } from "../atoms/LocChip";
import { fileToBase64, formatTimeWithZero, toNear } from "../../utils/helpers";
import store from "../../store/store";
import { PROOF_TYPE } from "../../near/contract";
import { ipfs } from "../../api/ipfs";
import { Box } from "@mui/system";

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
  onComplete?: () => void;
  isLoading: boolean;
}

const emojiKit = {
  default: "🤷‍♂️",
  text: "📝",
  media: "📷",
};

export const ChallengeItem: React.FC<Props> = ({
  uuid,
  name,
  bet,
  complete_date,
  expiration_date,
  onComplete,
  executed,
  wasted,
  isLoading,
  proof_type,
  proof_data,
}) => {
  const [icon, setIcon] = useState(emojiKit.default);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    switch (proof_type) {
      case PROOF_TYPE.MEDIA: {
        setIcon(emojiKit.media);
        break;
      }
      case PROOF_TYPE.TEXT: {
        setIcon(emojiKit.text);
        break;
      }
      default:
        setIcon(emojiKit.default);
        break;
    }
    if (proof_type === PROOF_TYPE.MEDIA && proof_data)
      ipfs
        .getFile(proof_data)
        .then((file) =>
          fileToBase64(file).then((base64) => setPicture(base64))
        );
  }, []);

  //if (proof_type === PROOF_TYPE.MEDIA && proof_data) ipfs.getFile(proof_data);
  const isEnded = executed || wasted;
  return (
    <React.Fragment>
      <Divider />
      <ListItem sx={{ height: 65 }}>
        <ListItemText sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar src={picture} sx={{bgcolor: "transparent"}}>{icon}</Avatar>
            {name}
          </Box>
        </ListItemText>
        <ListItemText sx={{ width: 100 }}>{toNear(bet)} Ⓝ</ListItemText>
        <ListItemText sx={{ width: 80 }}>
          {isEnded ? (
            dayjs(expiration_date).format("D MMMM YYYY")
          ) : (
            <Countdown
              // when out is time
              onComplete={() => console.log("Countdown onComplete")}
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
      //store.completeChallenge(uuid);
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
