import { useEffect, useState } from 'react';
import { Container, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './adminHeader.module.scss';
import ToggleMenu from './ToggleMenu/ToggleMenu';

const links = [
    { link: '/stats', label: 'Stats' },
    { link: '/blog', label: 'Blog' },
    { link: '/thought', label: 'Thought' },
    { link: '/community', label: 'Community' },
];

interface AdminHeaderProps {
    activeLink: any;
}

export default function AdminHeader({ activeLink }: AdminHeaderProps) {
    const matches = useMediaQuery('(min-width: 36em)');
    const [active, setActive] = useState(links[0].link);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        matches && setOpened(false);
    }, [matches]);

    useEffect(() => {
        activeLink(active);
    }, [active]);

    const setLink = (event, link) => {
        event.preventDefault();
        setActive(link.link);
    };

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            // onClick={(event) => {
            //     event.preventDefault();
            //     setActive(link.link);
            // }}
            onClick={(event) => setLink(event, link)}
        >
            {link.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <p>Admin Dashboard</p>

                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                {!matches && (
                    <ToggleMenu
                        setOpened={() => setOpened(!opened)}
                        opened={opened}
                        active={active}
                        setActive={setActive}
                    />
                )}
            </Container>
        </header>
    );
}
