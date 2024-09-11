import {
    Avatar,
    Button,
    Card,
    CloseButton,
    Dialog,
    Group,
    Text,
    TextInput,
} from '@mantine/core';
import { IconFishHook, IconThumbUpFilled } from '@tabler/icons-react';
import './thoughtcard.scss';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import moment from 'moment';

interface ThoughtCardProps {
    blogData: string;
}

export default function ThoughtCard({ blogData }: ThoughtCardProps) {
    const matches = useMediaQuery('(min-width: 75em)');
    const [opened, { toggle, close }] = useDisclosure(false);
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };
    const {
        avatar,
        userName,
        body,
        comments,
        date,
        galleryPhotos,
        likes,
        title,
        type,
        coverPhoto,
    } = blogData;
    let dateFormat = moment(date, moment.ISO_8601).format('YYYY-MM-DD');

    const blogLayout = (
        <>
            <Group justify="apart" className="thoughtcard__container__title">
                <Text fw={500}>{title}</Text>
            </Group>

            <Group mt="xs">
                <Text fw={300} className="thoughtcard__container__author">
                    {userName} - {dateFormat}
                </Text>
            </Group>
            <Text className="thoughtcard__container__text" fz="sm" mt="xs">
                {truncate(body, 145)}
            </Text>
        </>
    );

    const dialogLayout = (
        <>
            <Group justify="apart" className="thoughtcard__container__title">
                <Text fw={500}>{'Random Thought'}</Text>
                <Avatar src={avatar} alt="it's me" />
            </Group>

            <Group mt="xs">
                <Text fw={300} className="thoughtcard__container__author">
                    {userName} - {dateFormat}
                </Text>
            </Group>
            <Text className="thoughtcard__container__text" fz="sm" mt="xs">
                {body}
            </Text>
        </>
    );

    return (
        <div className="thoughtcard">
            <Card
                onClick={toggle}
                radius="md"
                p="md"
                className="thoughtcard__container"
            >
                <IconFishHook className="thoughtcard__container__icon" />
                <Card.Section className="thoughtcard__container__section">
                    {blogLayout}
                </Card.Section>
                <div className="thoughtcard__container__likes">
                    <IconThumbUpFilled /> {likes.length}
                </div>
            </Card>

            <Dialog
                opened={opened}
                withCloseButton
                onClose={close}
                size="xl"
                radius="md"
                zIndex={999999999}
                style={{
                    left: '1rem',
                    bottom: '1rem',
                    marginInline: 'auto',
                    width: !matches ? 'fit-content' : 'null',
                }}
            >
                {dialogLayout}
            </Dialog>
        </div>
    );
}
