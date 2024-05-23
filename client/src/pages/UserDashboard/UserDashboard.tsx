import './userdashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useEffect } from 'react';
import { getCurrentProfile } from '../../redux/actions/profiles';
import { Divider, Skeleton, Text } from '@mantine/core';
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout';
import BodyContainer from '../../components/BodyContainer/BodyContainer';
import EditProfileForm from '../../components/EditProfile/EditProfileForm';

export default function UserDashBoard() {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    return profile.loading === false ? (
        <BodyContainer fluid={false} size="">
            <div className="body__header">
                <Text td="underline" size="xl" fw={600}>
                    {user?.currentUser?.username}:
                </Text>
            </div>
            {profile.error !== false ? (
                <p>{profile.error.msg}</p>
            ) : (
                <>
                    <ProfileLayout />
                    <Divider my="md" />
                    <EditProfileForm profile={profile} />
                </>
            )}
        </BodyContainer>
    ) : (
        <>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </>
    );
}
