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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

interface HeroThoughtProps {
    selectedThought: any;
}

export default function HeroThought({ selectedThought }: HeroThoughtProps) {
    const dateFormat = moment(selectedThought.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [isLoading, setIsLoading] = useState(true);
    const [totalLikes, setTotalLikes] = useState(0);
    const [liked, setLiked] = useState('');
    const currentBlog = blogs.filter(
        (blog) => blog._id === selectedThought._id
    );
    let likes = currentBlog[0].likes.filter(
        (likes) => likes.selection === 'liked'
    ).length;

    useEffect(() => {
        setTotalLikes(likes);
    }, [likes]);

    useEffect(() => {
        if (user !== null) {
            const getUserLikedThoughts = async () => {
                const res = await checkLikes(selectedThought._id);
                setLiked(res);
            };
            getUserLikedThoughts();
        }

        setIsLoading(false);
    }, [user]);

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
                            dispatch(likeButton(selectedThought._id, 'non'));
                            setLiked(null);
                        }}
                    />
                    <span>{totalLikes}</span>
                    <IconThumbDown
                        onClick={() => {
                            dispatch(
                                likeButton(selectedThought._id, 'unliked')
                            );

                            setLiked('unliked');
                        }}
                    />
                </>
            )}
            {liked === 'unliked' && (
                <>
                    <IconThumbUp
                        onClick={() => {
                            dispatch(likeButton(selectedThought._id, 'liked'));

                            setLiked('liked');
                        }}
                    />
                    <span>{totalLikes}</span>
                    <IconThumbDownFilled
                        onClick={() => {
                            dispatch(likeButton(selectedThought._id, 'non'));
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
                            dispatch(likeButton(selectedThought._id, 'liked'));
                            setLiked('liked');
                        }}
                    />
                    <span>{totalLikes}</span>
                    <IconThumbDown
                        onClick={() => {
                            dispatch(
                                likeButton(selectedThought._id, 'unliked')
                            );

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
