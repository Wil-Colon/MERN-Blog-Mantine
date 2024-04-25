import './header.scss';
import { Flex, Image } from '@mantine/core';
import DarkModeBtn from '../Buttons/DarkModeBtn/DarkModeBtn';
import HeaderButtons from '../Buttons/HeaderButtons/HeaderButtons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { Fragment } from 'react';
import { logOutUser } from '../../redux/user/userSlice';

export default function Header() {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(
        (state: RootState) => state.user.currentUser
    );

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

    const logOut = <span onClick={() => dispatch(logOutUser())}>Logout</span>;

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
                        {isLoggedIn === null ? (
                            <Fragment>
                                <span> {login} </span>
                                <span>{register} </span>
                            </Fragment>
                        ) : (
                            <Fragment>{logOut}</Fragment>
                        )}
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
