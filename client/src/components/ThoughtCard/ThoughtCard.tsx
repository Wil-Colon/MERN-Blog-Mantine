import { Card, Group, Text } from '@mantine/core';
import { IconFishHook, IconThumbUpFilled } from '@tabler/icons-react';
import './thoughtcard.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface ThoughtCardProps {
    blogData: string;
}

export default function ThoughtCard({ blogData }: ThoughtCardProps) {
    const [totalLikes, setTotalLikes] = useState(
        blogData.likes.filter((like) => like.selection === 'liked').length
    );

    useEffect(() => {
        setTotalLikes(
            blogData.likes.filter((like) => like.selection === 'liked').length
        );
    }, [blogData.likes]);

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
    const dateFormat = moment(date, moment.ISO_8601).format('YYYY-MM-DD');
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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

    return (
        <div className="thoughtcard" onClick={() => scrollToTop()}>
            <Card radius="md" p="md" className="thoughtcard__container">
                <IconFishHook className="thoughtcard__container__icon" />
                <Card.Section className="thoughtcard__container__section">
                    {blogLayout}
                </Card.Section>
                <div className="thoughtcard__container__likes">
                    <IconThumbUpFilled /> {totalLikes}
                </div>
            </Card>
        </div>
    );
}
