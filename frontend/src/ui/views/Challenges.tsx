import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { ActionButton } from "../atoms/ActionButton";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import { useNavigation } from "./navigation";
import { toJS } from "mobx";

export const Challenges = observer(() => {
  const navigation = useNavigation();
  console.log("Challenges",toJS(store.userState))
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
        "TODO"
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
