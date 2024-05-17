import React, { MouseEventHandler } from "react";
import { IconButton } from "@chakra-ui/react";

type CustomIconButtonProps = {
  label: string;
  icon: React.ReactElement;
  color: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  label,
  icon,
  color,
  onClick,
  ...props
}) => {
  return (
    <IconButton
      aria-label={label}
      icon={icon}
      colorScheme={color}
      onClick={onClick}
      {...props}
    />
  );
};

export default CustomIconButton;
