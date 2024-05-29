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
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';
import { IconBrandFacebook } from '@tabler/icons-react';

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
                        <IconBrandX stroke={2} width={16} height={16} />
                    </Text>
                    {profile?.social?.x ? (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            www.x.com/{profile?.social?.x}
                        </Text>
                    ) : (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            Empty
                        </Text>
                    )}

                    <Text size="sm" fw={500}>
                        <IconBrandInstagram stroke={2} width={16} height={16} />
                    </Text>
                    {profile?.social?.instagram ? (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            www.instagram.com/{profile?.social?.instagram}
                        </Text>
                    ) : (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            Empty
                        </Text>
                    )}
                    <Text size="sm" fw={500}>
                        <IconBrandFacebook stroke={2} width={16} height={16} />
                    </Text>
                    {profile?.social?.facebook ? (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            www.facebook.com/{profile?.social?.facebook}
                        </Text>
                    ) : (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            Empty
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}
