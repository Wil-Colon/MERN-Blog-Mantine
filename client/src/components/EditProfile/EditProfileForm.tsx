import {
    Box,
    Button,
    Fieldset,
    Group,
    Text,
    TextInput,
    Tooltip,
} from '@mantine/core';
import './EditProfileForm.scss';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useState } from 'react';
import ValidateUrl from '../../utils/ValidateUrl';
import { updateProfile } from '../../redux/actions/profiles';

interface EditProfileFormProps {
    profile: any;
}

export default function EditProfileForm({ profile }: EditProfileFormProps) {
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState(profile);
    const [disableButton, setDisableButton] = useState(true);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: userProfile?.userProfile?.name,
            location: userProfile?.userProfile?.location,
            experience: userProfile?.userProfile?.experience,
            social: {
                x: userProfile?.userProfile?.social?.x,
                instagram: userProfile?.userProfile?.social?.instagram,
                facebook: userProfile?.userProfile?.social?.facebook,
            },
        },

        onValuesChange: () => {
            setDisableButton(!form.isDirty());
            console.log;
        },

        validate: {
            name: (value) => value.length > 20 && '20 characters max',
            location: (value) => value.length > 12 && '12 characters max',
            experience: (value) =>
                value.length > 2 || /^[0-9]+$/.test(value) === false
                    ? '2 characters or less, Numbers only'
                    : null,
            social: {
                x: (value) =>
                    ValidateUrl(value) === true
                        ? 'Please do no enter a URL'
                        : null,
                instagram: (value) =>
                    ValidateUrl(value) === true
                        ? 'Please do no enter a URL'
                        : null,
                facebook: (value) =>
                    ValidateUrl(value) === true
                        ? 'Please do no enter a URL'
                        : null,
            },
        },
    });

    return (
        <>
            <Text td="underline" size="xl" mt="2rem">
                Edit Profile:
            </Text>

            <Box maw={'25rem'} mt={'1rem'} pb={'2rem'}>
                <form
                    onSubmit={form.onSubmit((values) =>
                        dispatch(updateProfile(values))
                    )}
                >
                    <Fieldset
                        fw="600"
                        legend="Personal information"
                        radius="xs"
                    >
                        <TextInput
                            maw={'93%'}
                            label="Name"
                            placeholder="Enter your Name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            maw={'93%'}
                            label="Location"
                            placeholder="Enter a Location. City/State"
                            {...form.getInputProps('location')}
                        />
                        <TextInput
                            maw={'93%'}
                            label="Experience"
                            placeholder="Fishing experience in years?"
                            {...form.getInputProps('experience')}
                        />
                    </Fieldset>
                    <Fieldset
                        fw="600"
                        mt={'1rem'}
                        legend="Social Media"
                        radius="xs"
                    >
                        <TextInput
                            maw={'93%'}
                            label="www.x.com/"
                            placeholder="X"
                            {...form.getInputProps('social.x')}
                        />
                        <TextInput
                            maw={'93%'}
                            label="www.instagram.com/"
                            placeholder="Instagram"
                            {...form.getInputProps('social.instagram')}
                        />
                        <TextInput
                            maw={'93%'}
                            label="www.facebook.com/"
                            placeholder="Facebook"
                            {...form.getInputProps('social.facebook')}
                        />
                    </Fieldset>

                    <Group justify="flex-end" mt="md">
                        <Button disabled={disableButton} type="submit">
                            Submit
                        </Button>
                    </Group>
                </form>
            </Box>
        </>
    );
}
