import './blogcard.scss';
import img1 from '../../assets/images/filler1.png';
import { Group, Image, Stack, Text, rem } from '@mantine/core';
import { IconThumbUpFilled } from '@tabler/icons-react';

interface BlogCardProps {
    blogData: any;
}

export default function BlogCard({ blogData }: BlogCardProps) {
    const {
        userName,
        body,
        comments,
        date,
        galleryPhotos,
        likes,
        title,
        type,
    } = blogData;

    return (
        <>
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
                            {userName} - {'3/19/24'}
                        </Text>
                    </Stack>
                </Group>
                <Image radius="md" h={rem(200)} src={img1} />
            </div>
            <Text className="blogcard-container__likes">
                <IconThumbUpFilled /> {'2'}
            </Text>
        </>
    );
}
