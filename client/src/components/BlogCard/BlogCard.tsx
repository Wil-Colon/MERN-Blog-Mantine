import './blogcard.scss';
import { Group, Image, Stack, Text, rem } from '@mantine/core';
import { IconThumbUpFilled } from '@tabler/icons-react';
import moment from 'moment';

interface BlogCardProps {
    blogData: any;
}

export default function BlogCard({ blogData }: BlogCardProps) {
    const { userName, date, likes, title, coverPhoto } = blogData;
    const dateFormat = moment(date, moment.ISO_8601).format('YYYY-MM-DD');

    return (
        <div style={{ position: 'relative' }}>
            <div className="blogcard-container">
                <Group justify="apart" className="blogcard-container__header">
                    <Stack>
                        <Text
                            fw={500}
                            className="blogcard-container__header__title"
                        >
                            {title}{' '}
                        </Text>

                        <Text
                            fw={300}
                            className="blogcard-container__header__author"
                        >
                            {userName} - {dateFormat}
                        </Text>
                    </Stack>
                </Group>
                <Image radius="md" h={rem(200)} src={coverPhoto} />
            </div>
            <Text className="blogcard-container__likes">
                <IconThumbUpFilled />{' '}
                {likes.filter((like) => like.selection === 'liked').length}
            </Text>
        </div>
    );
}
