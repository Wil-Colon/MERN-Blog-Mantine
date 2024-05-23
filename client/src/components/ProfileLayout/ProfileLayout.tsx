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
                        {profile?.name ? profile?.name : 'No name provided'}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                    <Text c="dimmed" size="xs">
                        {profile?.location
                            ? profile?.location
                            : 'No location provided'}
                    </Text>
                    <Text c="dimmed" size="xs">
                        {profile?.experience
                            ? profile?.experience
                            : 'No experience provided'}
                    </Text>
                </div>
            </Group>
            {!matches && (
                <IconChevronRight style={{ height: rem(14) }} stroke={1.5} />
            )}

            <div className={classes.social}>
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        X:{' '}
                    </Text>
                    {profile?.social?.x ? (
                        profile?.social?.x
                    ) : (
                        <Text size="sm" c="dimmed">
                            Empty
                        </Text>
                    )}

                    <Text size="sm" fw={500}>
                        Instagram:{' '}
                    </Text>
                    {profile?.social?.instagram ? (
                        profile?.social?.instagram
                    ) : (
                        <Text size="sm" c="dimmed">
                            Empty
                        </Text>
                    )}
                    <Text size="sm" fw={500}>
                        Facebook:{' '}
                    </Text>
                    {profile?.social?.facebook ? (
                        profile?.social?.facebook
                    ) : (
                        <Text size="sm" c="dimmed">
                            Empty
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}
