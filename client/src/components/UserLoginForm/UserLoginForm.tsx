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
import classes from './userloginform.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { userLogin } from '../../redux/actions/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export function UserLoginForm() {
    const navigate = useNavigate();
    const error = useSelector((state: RootState) => state.user.error);
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        // if (token !== null) {
        //     navigate('/dashboard');
        // }

        if (token) {
            navigate('/dashboard');
        }
    }, [token, navigate]);

    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
        },
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form
                    onSubmit={form.onSubmit((values) =>
                        dispatch(userLogin(values))
                    )}
                >
                    <TextInput
                        label="Email"
                        placeholder="email@gmail.com"
                        required
                        style={{ width: '93%' }}
                        {...form.getInputProps('email')}
                    />
                    {error !== null && (
                        <Text color="red" size={'sm'}>
                            {error[0].msg}
                        </Text>
                    )}
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
            {/* {error !== null && <ErrorMessage errors={error} />} */}
        </Container>
    );
}
