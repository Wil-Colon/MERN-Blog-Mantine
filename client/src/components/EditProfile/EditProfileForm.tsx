import { Box, Button, Fieldset, Group, Text, TextInput } from '@mantine/core';
import './EditProfileForm.scss';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';

export default function EditProfileForm() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            location: '',
            experience: '',
            social: {
                x: '',
                instagram: '',
                facebook: '',
            },
        },

        validate: {
            name: (value) => value.length > 20 && '20 characters max',
            location: (value) => value.length > 12 && '12 characters max',
            experience: (value) =>
                value.length > 2 || /^[0-9]+$/.test(value) === false
                    ? '2 characters or less, Numbers only'
                    : null,
        },
    });
    return (
        <>
            <Text td="underline" size="xl" mt="2rem">
                Edit Profile:
            </Text>

            <Box maw={'25rem'} mt={'1rem'} pb={'2rem'}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                            label="X"
                            placeholder="X"
                            {...form.getInputProps('social.x')}
                        />
                        <TextInput
                            maw={'93%'}
                            label="Instagram"
                            placeholder="Instagram"
                            {...form.getInputProps('social.instagram')}
                        />
                        <TextInput
                            maw={'93%'}
                            label="Facebook"
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
