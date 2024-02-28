import "./header.scss";
import { Flex, Button, Image } from "@mantine/core";
import DarkModeBtn from "../Buttons/DarkModeBtn/DarkModeBtn";
import HeaderButtons from "../Buttons/HeaderButtons/HeaderButtons";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation().pathname;
  console.log(path);
  return (
    <header className="header">
      <Flex className="header__logo-container">
        <Image className="logo" src={logo} />
      </Flex>
      <Flex
        mih={50}
        justify="flex-end"
        align="center"
        direction="row"
        wrap="nowrap"
        className="header__btns"
      >
        <Link to="/">
          <HeaderButtons>Home</HeaderButtons>
        </Link>
        <Link to="/about">
          <HeaderButtons>About</HeaderButtons>
        </Link>
        <Link to="/blogs">
          <HeaderButtons>Blogs</HeaderButtons>
        </Link>
        <DarkModeBtn />
      </Flex>
    </header>
  );
}
