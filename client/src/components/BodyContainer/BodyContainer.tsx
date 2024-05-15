import { Container } from '@mantine/core';
import './bodyContainer.scss';

interface BodyContainerProps {
    children: any;
    size: string;
}

export default function BodyContainer({ children, size }: BodyContainerProps) {
    return (
        <Container size={size} my={20} className="bodyContainer">
            {children}
        </Container>
    );
}
