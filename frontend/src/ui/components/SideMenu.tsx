import { List, ListItem, Paper, PaperTypeMap } from "@mui/material";

import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import PlaylistAddCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCircleTwoTone";
import SwitchAccessShortcutAddTwoToneIcon from "@mui/icons-material/SwitchAccessShortcutAddTwoTone";
import KeyboardDoubleArrowDownTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowDownTwoTone";
import React from "react";
import { useNavigation } from "../views/navigation";
import { MenuItem } from "../atoms/MenuItem";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

type Props = DefaultComponentProps<PaperTypeMap>;

export const SideMenu: React.FC<Props> = () => {
  const navigator = useNavigation();
  return (
    <Paper sx={{ borderRadius: 5, height: "100%" }}>
      <List sx={{ width: "100%" }}>
        <ListItem alignItems="flex-start" sx={{ height: 80 }}></ListItem>

        <MenuItem
          Icon={() => <EmojiEventsTwoToneIcon />}
          onClick={navigator.goHome}
          title="CHALLENGES"
          subtitle="your challenge table"
        />
        <MenuItem
          Icon={() => <PlaylistAddCircleTwoToneIcon />}
          onClick={navigator.goAddChallengeView}
          title="ADD NEW CHALLENGE"
          subtitle="create your own challenge"
        />
        <MenuItem
          Icon={() => <SwitchAccessShortcutAddTwoToneIcon />}
          onClick={navigator.goDepositView}
          title="DEPOSIT"
          subtitle="add value to create new challenges"
        />
        <MenuItem
          Icon={() => <KeyboardDoubleArrowDownTwoToneIcon />}
          onClick={navigator.goWithdrawView}
          title="WITHDRAW"
          subtitle="get your free hold"
        />
      </List>
    </Paper>
  );
};
