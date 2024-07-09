import { Menu, Button, Text, rem, Burger } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';

interface ToggleMenuProps {
    opened: boolean;
    setOpened: any;
}

export default function ToggleMenu({ opened, setOpened }: ToggleMenuProps) {
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Burger opened={opened} onClick={setOpened} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    leftSection={
                        <IconSettings
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Stats
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconMessageCircle
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Blogs
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconPhoto
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Thoughts
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconSearch
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                >
                    Community
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
