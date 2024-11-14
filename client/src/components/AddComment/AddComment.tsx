import './addcomment.scss';
import { useState } from 'react';
import { Flex, Input, Text, Avatar, Group, Button } from '@mantine/core';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../redux/actions/blog';
import moment from 'moment';

interface CommentSimpleProps {
    commentData: string;
}

interface AddCommentProps {
    currentBlogId: string;
}

export function CommentSimple({ commentData }: CommentSimpleProps) {
    const dateFormat = moment(commentData.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );

    return (
        <div className="comments">
            <Group>
                <Avatar
                    src={commentData.avatar}
                    alt="Users avatar"
                    radius="xl"
                />
                <div>
                    <Text size="sm">{commentData.name}</Text>
                    <Text size="xs" c="dimmed">
                        {dateFormat}
                    </Text>
                </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
                {commentData.text}
            </Text>
        </div>
    );
}

export default function AddComment({ currentBlogId }: AddCommentProps) {
    const dispatch = useDispatch();
    const [clicked, setIsClicked] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const user = useSelector((state: RootState) => state.user.currentUser);
    const blogs = useSelector((state: RootState) => state.blogs.blogs);

    const submitComment = (commentData) => {
        dispatch(addComment(currentBlogId, commentData));
        setIsClicked(false);
        setCommentValue('');
    };

    return (
        <Flex direction="column" mb={'5rem'}>
            {!user ? (
                <Text fw="600">Please log in to Comment!</Text>
            ) : (
                <>
                    <div
                        className={
                            clicked ? `add-comment--selected` : 'add-comment'
                        }
                        onClick={() => setIsClicked(true)}
                        style={{ paddingBottom: '1rem' }}
                    >
                        <Input
                            variant="unstyled"
                            size="md"
                            placeholder="Add a comment"
                            onChange={(event) =>
                                setCommentValue(event.currentTarget.value)
                            }
                            value={commentValue}
                        />
                    </div>

                    <div className="buttons">
                        <Button
                            variant="subtle"
                            radius="xl"
                            mr={'1rem'}
                            onClick={() => {
                                setIsClicked(false);
                                setCommentValue('');
                            }}
                            disabled={!clicked}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            radius="xl"
                            onClick={() => submitComment(commentValue)}
                        >
                            Comment
                        </Button>
                    </div>
                </>
            )}

            <Text style={{ paddingTop: '1rem' }}>Comments:</Text>
        </Flex>
    );
}
