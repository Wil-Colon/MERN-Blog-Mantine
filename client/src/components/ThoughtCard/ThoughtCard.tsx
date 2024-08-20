import { Card, Group, Text } from '@mantine/core';
import { IconFishHook, IconThumbUpFilled } from '@tabler/icons-react';
import './thoughtcard.scss';

interface ThoughtCardProps {
    id: string;
}

export default function ThoughtCard({ id }: ThoughtCardProps) {
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <>
            <Card radius="md" p="md" className="thoughtcard-container">
                <IconFishHook className="thoughtcard-container__icon" />
                <Card.Section className="thoughtcard-container__section">
                    <Group
                        justify="apart"
                        className="thoughtcard-container__title"
                    >
                        <Text fw={500}>{'Random Thought'}</Text>
                    </Group>
                    <Group mt="xs">
                        <Text
                            fw={300}
                            className="thoughtcard-container__author"
                        >
                            {'Berto Agulilar'} - {'3/19/24'}
                        </Text>
                    </Group>
                    <Text
                        className="thoughtcard-container__text"
                        fz="sm"
                        mt="xs"
                    >
                        {truncate(
                            'Lorem Ipsum Lorm ismda oamdso lorem psum Lorm ismda oamdso lorem psum Lorm ismda oamdso lorem psum Lorm ismda oamdso lorem',
                            145
                        )}
                    </Text>
                </Card.Section>
            </Card>
            <Text className="thoughtcard-container__likes">
                <IconThumbUpFilled /> {'2'}
            </Text>
        </>
    );
}
