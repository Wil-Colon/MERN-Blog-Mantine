import './addcomment.scss';
import { useEffect, useState } from 'react';
import {
    Flex,
    Text,
    Avatar,
    Group,
    Button,
    TextInput,
    Menu,
    rem,
} from '@mantine/core';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment } from '../../redux/actions/blog';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import moment from 'moment';

interface UserCommentProps {
    commentData: string;
    commentOwnerUserId: string;
    currentBlogId: string;
}

interface AddCommentProps {
    currentBlogId: string;
}

export function UserComment({
    commentData,
    // commentOwnerUserId,
    currentBlogId,
}: UserCommentProps) {
    const dateFormat = moment(commentData.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [allowDeleteComment, setAllowDeleteComment] = useState(false);

    useEffect(() => {
        if (user !== null) {
            user._id === commentData.userId
                ? setAllowDeleteComment(true)
                : setAllowDeleteComment(false);
            user.isAdmin === true && setAllowDeleteComment(true);
        }
        if (user === null) {
            setAllowDeleteComment(false);
        }
    }, [user, commentData, blogs]);

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

            {allowDeleteComment && (
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Button variant="subtle" color="red">
                            <IconTrash stroke={2} />
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Delete Comment?</Menu.Label>

                        <Menu.Item
                            w={'88%'}
                            onClick={() =>
                                dispatch(
                                    deleteComment(
                                        currentBlogId,
                                        commentData._id
                                    )
                                )
                            }
                            color="red"
                            leftSection={
                                <IconTrash
                                    style={{
                                        width: rem(14),
                                        height: rem(14),
                                    }}
                                />
                            }
                        >
                            Delete comment
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            )}
        </div>
    );
}

export default function AddComment({ currentBlogId }: AddCommentProps) {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const [clicked, setIsClicked] = useState(false);

    const submitComment = (commentData) => {
        dispatch(addComment(currentBlogId, commentData));
        setIsClicked(false);
        form.reset();
    };

    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnChange: true,
        initialValues: {
            comment: '',
        },

        validate: {
            comment: (value) =>
                value.length > 200
                    ? 'Comment must not exceed 200 characters!'
                    : value.length <= 1
                    ? 'Comment must not be less then 1 character!'
                    : null,
        },
    });

    return (
        <Flex direction="column" mb={'2rem'}>
            {!user ? (
                <Text fw="600">Please log in to Comment!</Text>
            ) : (
                <>
                    <div
                        className={
                            clicked ? `add-comment--selected` : 'add-comment'
                        }
                        onClick={() => setIsClicked(true)}
                        style={{ paddingBottom: '1rem', marginBottom: '1rem' }}
                    >
                        <form
                            onSubmit={form.onSubmit((values) =>
                                submitComment(values.comment)
                            )}
                        >
                            <TextInput
                                variant="unstyled"
                                size="md"
                                label="Comment:"
                                placeholder="Add a comment"
                                key={form.key('comment')}
                                {...form.getInputProps('comment')}
                            />

                            <div className="buttons">
                                <Button
                                    variant="subtle"
                                    radius="xl"
                                    mr={'1rem'}
                                    onFocus={() => {
                                        setIsClicked(false);
                                        form.reset();
                                    }}
                                    disabled={!clicked}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="subtle"
                                    radius="xl"
                                    mr={'1rem'}
                                    disabled={!clicked}
                                >
                                    Comment
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Text style={{ paddingTop: '1rem' }}>Comments:</Text>
                </>
            )}
        </Flex>
    );
}
