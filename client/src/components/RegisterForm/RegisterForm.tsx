import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './registerform.module.scss';

export function RegisterForm() {
    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        validate: {
            username: (value) =>
                value.length <= 3 &&
                'User name must be longer then 3 characters!',
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            password: (value) =>
                value.length <= 5 &&
                'Password must be longer then 5 characters!',
        },
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Register a new account
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        label="Username"
                        placeholder="Select a user name"
                        required
                        style={{ width: '93%' }}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        label="Email"
                        placeholder="email@gmail.com"
                        required
                        style={{ width: '93%' }}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="lg"
                        style={{ width: '87%' }}
                        {...form.getInputProps('password')}
                    />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button
                        type="submit"
                        fullWidth
                        mt="xl"
                        style={{ width: '90%' }}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
