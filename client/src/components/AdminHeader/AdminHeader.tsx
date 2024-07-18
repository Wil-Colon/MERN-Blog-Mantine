import { useEffect, useState } from 'react';
import { Container, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './adminHeader.module.scss';
import ToggleMenu from './ToggleMenu/ToggleMenu';
import { Link } from 'react-router-dom';

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
    const location = window.location.pathname.slice(6);
    const matches = useMediaQuery('(min-width: 36em)');
    const [active, setActive] = useState(location);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        matches && setOpened(false);
    }, [matches]);

    useEffect(() => {
        activeLink(location);
        setActive(location);
    }, [active, location]);

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={`/admin${link.link}`}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                // event.preventDefault();
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
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
