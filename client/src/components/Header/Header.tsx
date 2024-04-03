import './header.scss';
import { Flex } from '@mantine/core';
import DarkModeBtn from '../Buttons/DarkModeBtn/DarkModeBtn';
import HeaderButtons from '../Buttons/HeaderButtons/HeaderButtons';
import { IconSailboat } from '@tabler/icons-react';

export default function Header() {
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
                        Admin Login{' '}
                        <span>
                            <IconSailboat />
                        </span>
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
