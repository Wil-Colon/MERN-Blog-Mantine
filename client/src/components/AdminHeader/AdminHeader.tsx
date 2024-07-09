import { useEffect, useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './adminHeader.module.scss';
import ToggleMenu from './ToggleMenu/ToggleMenu';

const links = [
    { link: '/stats', label: 'Stats' },
    { link: '/Blog', label: 'Blog' },
    { link: '/Thought', label: 'Thought' },
    { link: '/community', label: 'Community' },
];

export default function AdminHeader() {
    const [active, setActive] = useState(links[0].link);
    const matches = useMediaQuery('(min-width: 36em)');
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        matches && setOpened(false);
    }, [matches]);
    console.log(opened);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                {/* <MantineLogo size={28} /> */}
                <p>LoGo</p>

                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                {!matches && (
                    <ToggleMenu
                        setOpened={() => setOpened(!opened)}
                        opened={opened}
                    />
                )}
            </Container>
        </header>
    );
}
