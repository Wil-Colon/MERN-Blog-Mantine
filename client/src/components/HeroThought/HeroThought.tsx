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
import { Loader } from '@mantine/core';

interface HeroThoughtProps {
    selectedThought: any;
}

export default function HeroThought({ selectedThought }: HeroThoughtProps) {
    const [totalLikes, setTotalLikes] = useState(selectedThought.likes.length);
    const [liked, setLiked] = useState(null);
    const [unLiked, setUnLiked] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let dateFormat = moment(selectedThought.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );

    useEffect(() => {
        const getLikes = async () => {
            const res = await checkLikes(selectedThought._id);
            setLiked(res);
            setIsLoading(false);
        };
        getLikes();
    }, [selectedThought._id]);

    useEffect(() => {
        setLiked(
            selectedThought.likes.filter((like) => like.selection === 'like')
        );

        setUnLiked(
            selectedThought.likes.filter((like) => like.selection === 'unlike')
        );
    }, [selectedThought.likes]);

    const likeButtons =
        liked === 'like' ? (
            <div className="likeButton">
                <IconThumbUpFilled />
                {/* <span>{totalLikes}</span> */}
                <IconThumbDown
                    onClick={() => {
                        likeButton(selectedThought._id, 'unlike');
                        setLiked('unlike');
                        setTotalLikes(totalLikes - 1);
                    }}
                />
            </div>
        ) : liked === 'unlike' ? (
            <div className="likeButton">
                <IconThumbUp
                    onClick={() => {
                        likeButton(selectedThought._id, 'like');
                        setLiked('like');
                        setTotalLikes(totalLikes + 1);
                    }}
                />
                <IconThumbDownFilled />
                {/* <span>{totalLikes}</span> */}
            </div>
        ) : (
            <div className="likeButton">
                <IconThumbUp
                    onClick={() => {
                        likeButton(selectedThought._id, 'like');
                        setLiked('like');
                        setTotalLikes(totalLikes - 1);
                    }}
                />
                {/* <span>{totalLikes}</span> */}
                <IconThumbDown
                    onClick={() => {
                        likeButton(selectedThought._id, 'unlike');
                        setLiked('unlike');
                        setTotalLikes(totalLikes - 1);
                    }}
                />
            </div>
        );

    return (
        <>
            <p>"{selectedThought.title}"</p>
            <br />
            <p>{selectedThought.body}</p>
            <br />
            <small style={{ fontStyle: 'italic' }}>{dateFormat}</small>
            {!isLoading ? (
                likeButtons
            ) : (
                <div className="likebutton">
                    <Loader />
                </div>
            )}
        </>
    );
}
