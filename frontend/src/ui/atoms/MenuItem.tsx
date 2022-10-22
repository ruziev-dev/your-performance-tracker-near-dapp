import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonTypeMap,
  ListItemText,
  SvgIconProps,
} from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

import React from "react";

interface MenuItemProps {
  Icon: React.FC<SvgIconProps>;
  onClick: () => void;
  title: string;
  subtitle: string;
}

type Props = DefaultComponentProps<ListItemButtonTypeMap<MenuItemProps>>;

export const MenuItem: React.FC<Props> = ({
  Icon,
  onClick,
  title,
  subtitle,
  ...props
}) => {
  return (
    <ListItemButton alignItems="flex-start" onClick={onClick} {...props}>
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={subtitle}
        primaryTypographyProps={{
          variant: "button",
          fontWeight: "900",
          color: "text.disabled",
        }}
        secondaryTypographyProps={{
          color: "text.primary",
          variant: "caption",
          component: "span",
        }}
      />
    </ListItemButton>
  );
};
