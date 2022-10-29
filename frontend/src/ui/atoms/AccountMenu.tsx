import * as React from "react";
import { Button, ListItemIcon, Menu, MenuItem, useTheme } from "@mui/material";
import store from "../../store/store";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import ViewListTwoToneIcon from "@mui/icons-material/ViewListTwoTone";
import { DisplayText } from "./DisplayText";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    store.logout();
  };
  const openInExplorer = () => {
    handleClose();
    store.openAccountInExplorer();
  };

  const { palette } = useTheme();

  let name = store.accountId;
  const accountName =
    name && name?.length > 25
      ? `${name.slice(0, 8)}...${name.slice(-9)}`
      : name;

  return (
    <>
      <Button
        startIcon={<AccountCircleTwoToneIcon />}
        color="info"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {accountName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={openInExplorer}>
          <ListItemIcon sx={{ color: palette.text.disabled }}>
            <ViewListTwoToneIcon />
          </ListItemIcon>
          <DisplayText>Open in Explorer</DisplayText>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppTwoToneIcon sx={{ color: palette.text.disabled }} />
          </ListItemIcon>
          <DisplayText>Logout</DisplayText>
        </MenuItem>
      </Menu>
    </>
  );
}
