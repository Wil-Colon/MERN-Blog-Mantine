import { Group, Avatar, Text, rem, Anchor } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './profileLayout.module.scss';
import { RootState } from '../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';
import { IconBrandFacebook } from '@tabler/icons-react';

interface ProfileLayoutProps {
    profile: any;
}

export default function ProfileLayout({ profile }: ProfileLayoutProps) {
    const matches = useMediaQuery('(max-width: 50em)');
    const user = useSelector((state: RootState) => state.user.currentUser);
    const { email, avatar } = user;
    const {
        name,
        location,
        experience,
        social: { x, instagram, facebook },
    } = profile.userProfile;

    return (
        <div className={classes.user}>
            <Group className={classes.group}>
                <Avatar src={`http://${avatar}`} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name ? name : 'No name provided'}
                    </Text>

                    <Text size="xs">{email}</Text>
                    <Text size="xs">
                        {location ? location : 'No location provided'}
                    </Text>
                    <Text size="xs">
                        {experience
                            ? `${experience}yrs exp`
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
                    {x ? (
                        <Text size="sm" pb={'.5rem'}>
                            <Anchor href={`http://www.x.com/${x}`}>
                                www.x.com/{x}
                            </Anchor>
                        </Text>
                    ) : (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            Empty
                        </Text>
                    )}

                    <Text size="sm" fw={500}>
                        <IconBrandInstagram stroke={2} width={16} height={16} />
                    </Text>
                    {instagram ? (
                        <Text size="sm" pb={'.5rem'}>
                            <Anchor
                                href={`http://www.instagram.com/${instagram}`}
                            >
                                www.instagram.com/
                                {instagram}
                            </Anchor>
                        </Text>
                    ) : (
                        <Text size="sm" c="dimmed" pb={'.5rem'}>
                            Empty
                        </Text>
                    )}
                    <Text size="sm" fw={500}>
                        <IconBrandFacebook stroke={2} width={16} height={16} />
                    </Text>
                    {facebook ? (
                        <Text size="sm" pb={'.5rem'}>
                            <Anchor
                                href={`http://www.facebook.com/${facebook}`}
                            >
                                www.facebook.com/{facebook}
                            </Anchor>
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
