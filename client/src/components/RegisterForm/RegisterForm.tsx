import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './registerform.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../redux/actions/auth';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export function RegisterForm() {
    const user = useSelector((state: RootState) => state.user.currentUser);
    const error = useSelector((state: RootState) => state?.user?.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) navigate(`/dashboard`);
    }, [navigate, user]);

    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        validate: {
            username: (value) =>
                value.length <= 3 || /^[a-zA-Z0-9]+$/.test(value) === false
                    ? 'Username must be longer then 3 characters and must not contain special characters!'
                    : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            password: (value) =>
                value.length <= 5 &&
                'Password must be longer then 5 characters!',
        },
    });

    return (
        <Container size={420} my={40} className="container">
            <Title ta="center" className={classes.title}>
                Register a new account
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form
                    onSubmit={form.onSubmit((values) =>
                        dispatch(userRegister(values))
                    )}
                >
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
                        classNames={{
                            visibilityToggle: classes.visibilityToggle,
                        }}
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
            {error !== null && (
                <ErrorMessage title={'Register Error'} errors={error} />
            )}
        </Container>
    );
}
