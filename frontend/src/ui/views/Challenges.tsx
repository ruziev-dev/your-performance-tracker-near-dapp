import React from "react";
import { Box, List } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { ActionButton } from "../atoms/ActionButton";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import { useNavigation } from "./navigation";
import { toJS } from "mobx";
import { ChallengeItem, ChallengesHeader } from "../components/ChallengeItem";
import { Challenge } from "../../types/contract-entities";
import { PROOF_TYPE } from "../../near/contract";

export const Challenges = observer(() => {
  const navigation = useNavigation();

  const activeChallenges: Challenge[] = [];
  const finishedChallenges: Challenge[] = [];

  toJS(store.userState?.challenges)?.forEach((ch) => {
    if (ch.executed || ch.wasted) finishedChallenges.push(ch);
    else activeChallenges.push(ch);
  });

  const onCompleteChallenge = (challenge: Challenge, proofData?: string) => {
    switch (challenge.proof_type) {
      case PROOF_TYPE.NONE: {
        store.completeChallenge(challenge.uuid);
        return;
      }
      case PROOF_TYPE.TEXT: {
        if (!proofData) {
          store.showModal(challenge);
          //store.completeChallenge(challenge.uuid, proofData);
          return;
        } else {
        }
      }
      case PROOF_TYPE.MEDIA: {
        store.showModal(challenge);
        return;
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {!!store.userState?.challenges.length ? (
        <Box sx={{ flex: 1, height: "100%", padding: 2 }}>
          <List>
            <ChallengesHeader />
            {activeChallenges.map((challenge) => (
              <ChallengeItem
                isLoading={store.isLoading}
                key={challenge.uuid}
                {...challenge}
                onComplete={() => onCompleteChallenge(challenge)}
              />
            ))}
            {finishedChallenges.map((challenge) => (
              <ChallengeItem
                isLoading={store.isLoading}
                key={challenge.uuid}
                {...challenge}
              />
            ))}
          </List>
        </Box>
      ) : (
        <ActionButton
          isLoading={store.isLoading}
          title="ADD NEW CHALLENGE"
          startIcon={<PlaylistAddCircleTwoToneIcon />}
          onClick={navigation.goAddChallengeView}
        />
      )}
    </Box>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
