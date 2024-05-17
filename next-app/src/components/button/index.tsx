import { Button } from "@chakra-ui/react";
import { ReactNode, MouseEventHandler } from "react";

interface CustomButtonProps {
  icon?: React.ReactElement;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

const CustomButton = ({
  icon,
  children,
  color,
  ...props
}: CustomButtonProps) => {
  return (
    <Button leftIcon={icon} colorScheme={color} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
