import { Box } from '@mantine/core';
import { UserLoginForm } from '../components/UserLoginForm/UserLoginForm';
import { useLocation } from 'react-router-dom';

export default function Login() {
    let { state } = useLocation();

    return (
        <Box pb={100}>
            <UserLoginForm location={state} />
        </Box>
    );
}
