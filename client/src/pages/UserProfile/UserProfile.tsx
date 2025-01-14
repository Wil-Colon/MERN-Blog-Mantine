import { useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProfileByID } from '../../redux/actions/profiles';
import BodyContainer from '../../components/BodyContainer/BodyContainer';

import {
    IconAt,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandX,
    IconPhoneCall,
} from '@tabler/icons-react';
import { Anchor, Avatar, Center, Group, Loader, Text } from '@mantine/core';
import classes from './UserProfile.module.scss';

export default function UserProfile() {
    const dispatch = useDispatch();
    const location = useLocation();
    let profileId = location.pathname.slice(13);

    const [profile, setProfile] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            const res = await dispatch(getProfileByID(profileId));

            setProfile(res);
        };
        getProfile();
    }, [profileId]);

    const loadingContainer = (
        <BodyContainer fluid={false} size="lg" pb="">
            <Center h={800}>
                <Loader />
            </Center>
        </BodyContainer>
    );

    return profile === '' ? (
        loadingContainer
    ) : (
        <Fragment>
            <BodyContainer fluid={false} size="lg" pb="">
                User Profile of:
                <div>
                    <Center h={400}>
                        <Group wrap="nowrap">
                            <Avatar
                                src={profile.profile.avatar}
                                size={94}
                                radius="md"
                            />
                            <div>
                                <Text
                                    fz="xs"
                                    tt="uppercase"
                                    fw={700}
                                    c="dimmed"
                                >
                                    {profile.profile.experience
                                        ? `Fisherman for ${profile.profile.experience} years`
                                        : null}
                                </Text>

                                <Text fz="lg" fw={500} className={classes.name}>
                                    {profile.profile.name}
                                </Text>

                                <Group wrap="nowrap" gap={10} mt={3}>
                                    <IconAt
                                        stroke={1.5}
                                        size={16}
                                        className={classes.icon}
                                    />
                                    <Text fz="xs" c="dimmed">
                                        {profile.profile.location}
                                    </Text>
                                </Group>

                                <Group wrap="nowrap" gap={10} mt={5}>
                                    <div className={classes.social}>
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>
                                                <IconBrandX
                                                    stroke={2}
                                                    width={16}
                                                    height={16}
                                                />
                                            </Text>
                                            {profile.profile.social.x ? (
                                                <Text size="sm" pb={'.5rem'}>
                                                    <Anchor
                                                        href={`http://www.x.com/${profile.profile.social.x}`}
                                                    >
                                                        www.x.com/
                                                        {
                                                            profile.profile
                                                                .social.x
                                                        }
                                                    </Anchor>
                                                </Text>
                                            ) : (
                                                <Text
                                                    size="sm"
                                                    c="dimmed"
                                                    pb={'.5rem'}
                                                >
                                                    Empty
                                                </Text>
                                            )}

                                            <Text size="sm" fw={500}>
                                                <IconBrandInstagram
                                                    stroke={2}
                                                    width={16}
                                                    height={16}
                                                />
                                            </Text>
                                            {profile.profile.social
                                                .instagram ? (
                                                <Text size="sm" pb={'.5rem'}>
                                                    <Anchor
                                                        href={`http://www.instagram.com/${profile.profile.social.instagram}`}
                                                    >
                                                        www.instagram.com/
                                                        {
                                                            profile.profile
                                                                .social
                                                                .instagram
                                                        }
                                                    </Anchor>
                                                </Text>
                                            ) : (
                                                <Text
                                                    size="sm"
                                                    c="dimmed"
                                                    pb={'.5rem'}
                                                >
                                                    Empty
                                                </Text>
                                            )}
                                            <Text size="sm" fw={500}>
                                                <IconBrandFacebook
                                                    stroke={2}
                                                    width={16}
                                                    height={16}
                                                />
                                            </Text>
                                            {profile.profile.social.facebook ? (
                                                <Text size="sm" pb={'.5rem'}>
                                                    <Anchor
                                                        href={`http://www.facebook.com/${profile.profile.social.facebook}`}
                                                    >
                                                        www.facebook.com/
                                                        {
                                                            profile.profile
                                                                .social.facebook
                                                        }
                                                    </Anchor>
                                                </Text>
                                            ) : (
                                                <Text
                                                    size="sm"
                                                    c="dimmed"
                                                    pb={'.5rem'}
                                                >
                                                    Empty
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Group>
                            </div>
                        </Group>
                    </Center>
                </div>
            </BodyContainer>
        </Fragment>
    );
}
