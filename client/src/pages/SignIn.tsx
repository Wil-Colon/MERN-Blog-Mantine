import { Box } from '@mantine/core';
import { UserLoginForm } from '../components/UserLoginForm/UserLoginForm';

export default function SignIn() {
    return (
        <Box pb={100}>
            <UserLoginForm />
        </Box>
    );
}
