import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    rem,
    Loader,
    Center,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './profileLayout.module.scss';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';

export default function ProfileLayout() {
    const profile = useSelector((state: RootState) => state.profile);

    const user = useSelector((state: RootState) => state.user.currentUser);

    const { name, avatar, email } = user;
    const { location } = profile;

    return profile.loading === false ? (
        <>
            <UnstyledButton className={classes.user} w="20rem">
                <Group>
                    <Avatar src={`http://${avatar}`} radius="xl" />

                    <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                            {name ? name : 'No name provided'}
                        </Text>

                        <Text c="dimmed" size="xs">
                            {email}
                        </Text>
                        <Text c="dimmed" size="xs">
                            {location ? location : 'No location provided'}
                        </Text>
                    </div>

                    <IconChevronRight
                        style={{ height: rem(14) }}
                        stroke={1.5}
                    />
                </Group>
            </UnstyledButton>
        </>
    ) : (
        <Center>
            <Loader />
        </Center>
    );
}
