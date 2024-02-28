import { Button } from "@mantine/core";
import "./headerButtons.scss";

interface ButtonProps {
  children: string;
}

export default function HeaderButtons({ children }: ButtonProps) {
  return (
    <Button className="button" variant="transparent">
      {children}
    </Button>
  );
}
