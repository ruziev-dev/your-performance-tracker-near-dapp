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

export const Challenges = observer(() => {
  const navigation = useNavigation();

  const activeChallenges: Challenge[] = [];
  const completedChallenges: Challenge[] = [];

  store.userState?.challenges.forEach((ch) => {
    if (ch.executed) completedChallenges.push(ch);
    else activeChallenges.push(ch);
  });

  console.log("Challenges", toJS(store.userState));
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
                onComplete={() => store.completeChallenge(challenge.uuid)}
              />
            ))}
            {completedChallenges.map((challenge) => (
              <ChallengeItem
                isLoading={store.isLoading}
                key={challenge.uuid}
                {...challenge}
                onComplete={() => store.completeChallenge(challenge.uuid)}
              />
            ))}
          </List>
        </Box>
      ) : (
        <ActionButton
          isLoading={store.isLoading}
          title="ADD NEW Challenge"
          startIcon={<PlaylistAddCircleTwoToneIcon />}
          onClick={navigation.goAddChallengeView}
        />
      )}
    </Box>
  );
});
