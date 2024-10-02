import './herothought.scss';
import moment from 'moment';
import {
    IconThumbDown,
    IconThumbDownFilled,
    IconThumbUp,
    IconThumbUpFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { checkLikes, likeButton, unLikeButton } from '../../redux/actions/blog';
import { Loader, Popover, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

interface HeroThoughtProps {
    selectedThought: any;
}

export default function HeroThought({ selectedThought }: HeroThoughtProps) {
    const user = useSelector((state: RootState) => state.user.currentUser);
    const [isLoading, setIsLoading] = useState(true);
    const dateFormat = moment(selectedThought.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );
    const [totalLikes, setTotalLikes] = useState(
        selectedThought.likes.filter((like) => like.selection === 'liked')
            .length
    );
    const [liked, setLiked] = useState('');

    useEffect(() => {
        if (user !== null) {
            const getLikes = async () => {
                const res = await checkLikes(selectedThought._id);
                setLiked(res);
            };
            getLikes();
        }

        setIsLoading(false);
    }, [selectedThought._id, selectedThought.likes, user]);

    const popoverLike = (
        <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
                <IconThumbUp />
            </Popover.Target>
            <Popover.Dropdown>
                <Text size="xs">Login to like!</Text>
            </Popover.Dropdown>
        </Popover>
    );

    const popoverUnLike = (
        <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
                <IconThumbDown />
            </Popover.Target>
            <Popover.Dropdown>
                <Text size="xs">Login to unlike!</Text>
            </Popover.Dropdown>
        </Popover>
    );

    const likeButtonsNonUser = (
        <div className="likeButton">
            {popoverLike}
            <span>{totalLikes}</span>
            {popoverUnLike}
        </div>
    );

    const likeButtonsUser = (
        <div className="likeButton">
            {liked === 'liked' && (
                <>
                    <IconThumbUpFilled
                        onClick={() => {
                            likeButton(selectedThought._id, 'non');
                            setLiked(null);
                            setTotalLikes(totalLikes - 1);
                        }}
                    />
                    <span>{totalLikes}</span>
                    <IconThumbDown
                        onClick={() => {
                            likeButton(selectedThought._id, 'unliked');
                            setLiked('unliked');
                            setTotalLikes(totalLikes - 1);
                        }}
                    />
                </>
            )}
            {liked === 'unliked' && (
                <>
                    <IconThumbUp
                        onClick={() => {
                            likeButton(selectedThought._id, 'liked');
                            setLiked('liked');
                            setTotalLikes(totalLikes + 1);
                        }}
                    />
                    <span>{totalLikes}</span>
                    <IconThumbDownFilled
                        onClick={() => {
                            likeButton(selectedThought._id, 'non');
                            setLiked(null);
                        }}
                    />
                </>
            )}
            {liked === null && (
                <>
                    {' '}
                    <IconThumbUp
                        onClick={() => {
                            likeButton(selectedThought._id, 'liked');
                            setLiked('liked');
                            setTotalLikes(totalLikes + 1);
                        }}
                    />
                    <span>{totalLikes}</span>
                    <IconThumbDown
                        onClick={() => {
                            likeButton(selectedThought._id, 'unliked');
                            setLiked('unliked');
                        }}
                    />{' '}
                </>
            )}
        </div>
    );

    return (
        <>
            <p>"{selectedThought.title}"</p>
            <br />
            <p>{selectedThought.body}</p>
            <br />
            <small style={{ fontStyle: 'italic' }}>{dateFormat}</small>
            {isLoading ? (
                <div className="likebutton">
                    <Loader />
                </div>
            ) : user ? (
                likeButtonsUser
            ) : (
                likeButtonsNonUser
            )}
        </>
    );
}
