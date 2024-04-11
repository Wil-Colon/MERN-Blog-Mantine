import './header.scss';
import { Flex } from '@mantine/core';
import DarkModeBtn from '../Buttons/DarkModeBtn/DarkModeBtn';
import HeaderButtons from '../Buttons/HeaderButtons/HeaderButtons';
import { IconSailboat } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

//LOGIN TERNARY: If user logged in, dont show anything. If user not logged in, show both login/register button

export default function Header() {
    const register = (
        <Link to="/register" className="register-btn">
            <p>Register</p>
        </Link>
    );

    const login = (
        <Link to="/login" className="register-btn">
            <p>Login</p>
        </Link>
    );
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
                        <span> {login} </span>
                        <span>{register} </span>
                    </div>
                </div>
                <DarkModeBtn />
            </Flex>

            <Flex
                mih={50}
                align="center"
                direction="row"
                wrap="nowrap"
                className="header__bottom"
            >
                <HeaderButtons />
            </Flex>
        </header>
    );
}
