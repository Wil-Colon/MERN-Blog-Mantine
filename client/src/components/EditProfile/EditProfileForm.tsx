import { Box, Button, Fieldset, Group, Text, TextInput } from '@mantine/core';
import './EditProfileForm.scss';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useEffect, useState } from 'react';

interface EditProfileFormProps {
    profile: any;
}

export default function EditProfileForm({ profile }: EditProfileFormProps) {
    const [userProfile, setUserProfile] = useState(profile);

    const urlPattern = new RegExp(
        '(?:https?)://(w+:?w*)?(S+)(:d+)?(/|/([w#!:.?+=&%!-/]))?'
    );

    const isValidUrl = (urlString) => {
        let urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$',
            'i'
        ); // validate fragment locator
        return !!urlPattern.test(urlString);
    };
    const form = useForm({
        // mode: 'uncontrolled',
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
        transformValues: (values) => ({
            ...values,
            social: {
                x: `www.x.com/${values.social.x}`,
            },
            instagram: {
                x: `www.instagram.com/${values.social.instagram}`,
            },
            facebook: {
                x: `www.facebook.com/${values.social.facebook}`,
            },
        }),

        validate: {
            name: (value) => value.length > 20 && '20 characters max',
            location: (value) => value.length > 12 && '12 characters max',
            experience: (value) =>
                value.length > 2 || /^[0-9]+$/.test(value) === false
                    ? '2 characters or less, Numbers only'
                    : null,
            social: {
                x: (value) =>
                    isValidUrl(value) === true
                        ? 'Please do no enter a URL'
                        : null,
                instagram: (value) =>
                    isValidUrl(value) === true
                        ? 'Please do no enter a URL'
                        : null,
                facebook: (value) =>
                    isValidUrl(value) === true
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
                        console.log(form.values)
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
                            placeholder="Enter years Experience"
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
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </>
    );
}
