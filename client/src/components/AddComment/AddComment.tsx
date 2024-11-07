import './addcomment.scss';
import { useState } from 'react';
import { Flex, Input, Text, Avatar, Group, Button } from '@mantine/core';

function CommentSimple() {
    return (
        <div>
            <Group>
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                    alt="Jacob Warnhalter"
                    radius="xl"
                />
                <div>
                    <Text size="sm">Jacob Warnhalter</Text>
                    <Text size="xs" c="dimmed">
                        10 minutes ago
                    </Text>
                </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
                This Pokémon likes to lick its palms that are sweetened by being
                soaked in honey. Teddiursa concocts its own honey by blending
                fruits and pollen collected by Beedrill. Blastoise has water
                spouts that protrude from its shell. The water spouts are very
                accurate.
            </Text>
        </div>
    );
}

export default function AddComment() {
    const [clicked, isClicked] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    console.log(commentValue);
    return (
        <Flex direction="column" mb={'5rem'}>
            <div
                className={clicked ? `add-comment--selected` : 'add-comment'}
                onClick={() => isClicked(true)}
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
                        isClicked(false);
                        setCommentValue('');
                    }}
                    disabled={!clicked}
                >
                    Cancel
                </Button>
                <Button variant="filled" radius="xl">
                    Comment
                </Button>
            </div>

            <Text style={{ paddingTop: '1rem' }}>Comments:</Text>

            <CommentSimple />
        </Flex>
    );
}
