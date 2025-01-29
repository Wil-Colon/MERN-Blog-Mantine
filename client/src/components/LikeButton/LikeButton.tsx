import { Loader, Popover, Text } from '@mantine/core';
import {
    IconThumbDown,
    IconThumbDownFilled,
    IconThumbUp,
    IconThumbUpFilled,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkLikes,
    getSingleBlogById,
    likeButton,
} from '../../redux/actions/blog';
import { useEffect, useState } from 'react';
import { RootState } from '../../redux/rootReducer';

interface LikeButtonUserProps {
    selectedThought: any;
}

interface LikeButtonNonUserProps {
    selectedThought: any;
}

export default function LikeButton({ selectedThought }: LikeButtonUserProps) {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const [isLoading, setIsLoading] = useState(true);
    const [liked, setLiked] = useState('');
    const [totalLikes, setTotalLikes] = useState(0);

    useEffect(() => {
        setTotalLikes(
            blogs
                .filter((blog) => blog._id === selectedThought._id)[0]
                .likes.filter((likes) => likes.selection === 'liked').length
        );
    }, [blogs, selectedThought]);

    useEffect(() => {
        if (user !== null) {
            const getUserLikedThoughts = async () => {
                let res = await checkLikes(selectedThought._id);
                if (res === null) {
                    res = 'non';
                }
                setLiked(res);
            };
            getUserLikedThoughts();
        }
        setIsLoading(false);
    }, [user, selectedThought]);

    return isLoading ? (
        <div className="likebutton">
            <Loader />
        </div>
    ) : (
        <div className="likeButton">
            {liked === 'liked' && (
                <>
                    <IconThumbUpFilled
                        onClick={() => {
                            dispatch(likeButton(selectedThought._id, 'non'));
                            setLiked('non');
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
                            setLiked('non');
                        }}
                    />
                </>
            )}
            {liked === 'non' && (
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
}

export function LikeButtonsNonUser({
    selectedThought,
}: LikeButtonNonUserProps) {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [totalLikes, setTotalLikes] = useState(
        blogs.likes.filter((likes) => likes.selection === 'liked').length
    );
    // const currentBlog = blogs.filter(
    //     (blog) => blog._id === selectedThought._id
    // );

    // const likes = blogs.likes.filter(
    //     (likes) => likes.selection === 'liked'
    // ).length;

    // useEffect(() => {
    //     dispatch(getSingleBlogById(selectedThought._id));

    //     blogs !== null &&
    //         setTotalLikes(
    //             blogs.likes.filter((likes) => likes.selection === 'liked')
    //                 .length
    //         );
    // }, [dispatch, selectedThought, blogs]);

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

    return (
        <div className="likeButton">
            {popoverLike}
            <span>{totalLikes}</span>
            {popoverUnLike}
        </div>
    );
}
