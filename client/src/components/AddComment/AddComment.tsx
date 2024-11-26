import './addcomment.scss';
import { useState } from 'react';
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
import { addComment } from '../../redux/actions/blog';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { IconTrash } from '@tabler/icons-react';

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
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);

    //WRITE CODE TO CHECK IF USER IS THE CURRENT USER LOGGED IN, OR IS A ADMIN, THEN ALLOW DELETE COMMENT.

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

            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button variant="subtle" color="red">
                        <IconTrash stroke={2} />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Delete Comment?</Menu.Label>

                    <Menu.Item
                        color="red"
                        leftSection={
                            <IconTrash
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                    >
                        Delete comment
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
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
