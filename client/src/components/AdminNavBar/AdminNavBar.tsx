import { useState } from 'react';
import { Group, Code, Burger, AppShell, Drawer } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons-react';
import classes from './AdminNavBar.module.scss';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const data = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function AdminNavBar() {
    const [active, setActive] = useState('Billing');
    // const [opened, setOpened] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [showNav, setShowNav] = useState(false);
    const matches = useMediaQuery('(min-width: 56.25em)');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    const navBarContent = (
        <>
            <nav className={classes.navbar}>
                <div className={classes.navbarMain}>
                    <Group className={classes.header} justify="space-between">
                        LOGO
                        <Code fw={700} className={classes.version}>
                            v3.1.2
                        </Code>
                    </Group>
                    {links}
                </div>
                <div className={classes.footer}>
                    <a
                        href="#"
                        className={classes.link}
                        onClick={(event) => event.preventDefault()}
                    >
                        <IconSwitchHorizontal
                            className={classes.linkIcon}
                            stroke={1.5}
                        />
                        <span>Change account</span>
                    </a>

                    <a
                        href="#"
                        className={classes.link}
                        onClick={(event) => event.preventDefault()}
                    >
                        <IconLogout className={classes.linkIcon} stroke={1.5} />
                        <span>Logout</span>
                    </a>
                </div>
            </nav>
        </>
    );

    const toggleNav = () => {
        // setOpened(!opened);
        setShowNav(!showNav);

        // console.log(opened);
    };

    return (
        <>
            <Drawer opened={opened} onClose={close}>
                <nav className={classes.navbar}>
                    <div className={classes.navbarMain}>
                        <Group
                            className={classes.header}
                            justify="space-between"
                        >
                            LOGO
                            <Code fw={700} className={classes.version}>
                                v3.1.2
                            </Code>
                        </Group>
                        {links}
                    </div>
                    <div className={classes.footer}>
                        <a
                            href="#"
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <IconSwitchHorizontal
                                className={classes.linkIcon}
                                stroke={1.5}
                            />
                            <span>Change account</span>
                        </a>

                        <a
                            href="#"
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <IconLogout
                                className={classes.linkIcon}
                                stroke={1.5}
                            />
                            <span>Logout</span>
                        </a>
                    </div>
                </nav>
            </Drawer>

            {!matches ? (
                <Burger
                    opened={opened}
                    onClick={open}
                    aria-label="Toggle navigation"
                />
            ) : (
                navBarContent
            )}
        </>
    );
}
