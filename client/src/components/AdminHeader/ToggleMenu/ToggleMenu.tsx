import { Menu, rem, Burger } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToggleMenuProps {
    opened: boolean;
    setOpened: any;
    active: string;
    setActive: any;
}

export default function ToggleMenu({
    opened,
    setOpened,
    active,
    setActive,
}: ToggleMenuProps) {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(active);

    useEffect(() => {
        setActive(activeItem);
    }, [activeItem]);

    const toggleMenuItem = (item: string) => {
        setOpened();
        navigate(`/admin${item}`);
    };

    return (
        <Menu
            shadow="md"
            width={200}
            closeOnClickOutside={false}
            zIndex={'99999'}
        >
            <Menu.Target>
                <Burger opened={opened} onClick={setOpened} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => toggleMenuItem('/stats')}
                    leftSection={
                        <IconSettings
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    <p
                        style={
                            active === '/stats'
                                ? { color: 'red', textDecoration: 'underline' }
                                : {}
                        }
                    >
                        Stats
                    </p>
                </Menu.Item>
                <Menu.Item
                    onClick={() => toggleMenuItem('/blog')}
                    leftSection={
                        <IconMessageCircle
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    <p
                        style={
                            active === '/blog'
                                ? { color: 'red', textDecoration: 'underline' }
                                : {}
                        }
                    >
                        Blog
                    </p>
                </Menu.Item>
                <Menu.Item
                    onClick={() => toggleMenuItem('/thought')}
                    leftSection={
                        <IconPhoto
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    <p
                        style={
                            active === '/thought'
                                ? { color: 'red', textDecoration: 'underline' }
                                : {}
                        }
                    >
                        Thought
                    </p>
                </Menu.Item>
                <Menu.Item
                    onClick={() => toggleMenuItem('/community')}
                    leftSection={
                        <IconSearch
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    <p
                        style={
                            active === '/community'
                                ? { color: 'red', textDecoration: 'underline' }
                                : {}
                        }
                    >
                        Community
                    </p>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
