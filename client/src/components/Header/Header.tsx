import "./header.scss";
import { Flex, Button, Image } from "@mantine/core";
import DarkModeBtn from "../Buttons/DarkModeBtn/DarkModeBtn";
import HeaderButtons from "../Buttons/HeaderButtons/HeaderButtons";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { IconSailboat } from "@tabler/icons-react";

export default function Header() {
  const path = useLocation().pathname;
  console.log(path);
  return (
    <header className="header">
      <Flex gap="md" className="header__top">
        <div className="top-container__left">
          <div className="top-container__left-logo">
            Gilberto <span>Angling</span>
          </div>
          <div className="top-container__left-text">
            <span>Blog Posts: Num</span>

            <span>Thought Posts: Num</span>
          </div>
        </div>

        <div className="top-container__right">
          <div className="top-container__right-text">
            Admin Login{" "}
            <span>
              <IconSailboat />
            </span>
          </div>
          <span>
            <DarkModeBtn />
          </span>
        </div>
      </Flex>

      <Flex
        mih={50}
        align="center"
        direction="row"
        wrap="nowrap"
        className="header__bottom"
      >
        <Link to="/" className="link-item">
          <HeaderButtons>Home</HeaderButtons>
        </Link>
        <Link to="/about" className="link-item">
          <HeaderButtons>About</HeaderButtons>
        </Link>
        <Link to="/blogs" className="link-item">
          <HeaderButtons>Blogs</HeaderButtons>
        </Link>
      </Flex>
    </header>
  );
}
