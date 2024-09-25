import './herothought.scss';
import moment from 'moment';
import {
    IconThumbDown,
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
    const [liked, setLiked] = useState(false);
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

    const isLiked =
        liked === true ? (
            <div className="likeButton">
                <IconThumbUpFilled />
                <span>{totalLikes}</span>
                <IconThumbDown
                    onClick={() => {
                        unLikeButton(selectedThought._id);
                        setLiked(false);
                        setTotalLikes(totalLikes - 1);
                    }}
                />
            </div>
        ) : (
            <div className="likeButton">
                <IconThumbUp
                    onClick={() => {
                        likeButton(selectedThought._id);
                        setLiked(true);
                        setTotalLikes(totalLikes + 1);
                    }}
                />
                <span>{totalLikes}</span>
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
                isLiked
            ) : (
                <div className="likebutton">
                    <Loader />
                </div>
            )}
        </>
    );
}
