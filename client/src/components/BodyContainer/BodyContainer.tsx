import { Container } from '@mantine/core';
import './bodyContainer.scss';

interface BodyContainerProps {
    children: any;
    size: string;
    fluid: boolean;
}

export default function BodyContainer({
    children,
    size,
    fluid,
}: BodyContainerProps) {
    return (
        <Container fluid={fluid} size={size} className="container">
            {children}
        </Container>
    );
}
