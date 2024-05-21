import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    rem,
    Loader,
    Center,
    Divider,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './profileLayout.module.scss';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';

export default function ProfileLayout() {
    const matches = useMediaQuery('(max-width: 50em)');
    const user = useSelector((state: RootState) => state.user.currentUser);
    const profile = useSelector(
        (state: RootState) => state.profile.userProfile
    );

    const { email, avatar } = user;

    return (
        <div className={classes.user}>
            <Group className={classes.group}>
                <Avatar src={`http://${avatar}`} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {profile?.userProfile?.name
                            ? profile?.userProfile?.name
                            : 'No name provided'}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                    <Text c="dimmed" size="xs">
                        {profile?.userProfile?.location
                            ? profile?.userProfile?.location
                            : 'No location provided'}
                    </Text>
                    <Text c="dimmed" size="xs">
                        {profile?.userProfile?.experience
                            ? profile?.userProfile?.experience
                            : 'No experience provided'}
                    </Text>
                </div>
            </Group>
            {!matches && (
                <IconChevronRight style={{ height: rem(14) }} stroke={1.5} />
            )}

            <div>
                <Text td="underline" size="xl">
                    Social:
                </Text>

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        Twitter: {profile?.userProfile?.experience}
                    </Text>

                    <Text size="sm" fw={500}>
                        Instagram:
                    </Text>
                    <Text size="sm" fw={500}>
                        Facebook: {}
                    </Text>
                </div>
            </div>
        </div>
    );
}
