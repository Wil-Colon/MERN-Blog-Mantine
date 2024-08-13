import { Center } from '@mantine/core';
import BodyContainer from '../components/BodyContainer/BodyContainer';

export default function PageNotFound() {
    return (
        <BodyContainer size="xs" fluid>
            <Center>
                <h1 style={{ fontSize: '80px' }}>404</h1>
                <h1>Page Not Found</h1>
            </Center>
        </BodyContainer>
    );
}
