import { Container } from '@mantine/core';
import './bodyContainer.scss';

interface BodyContainerProps {
    children: any;
    size: string;
    fluid: boolean;
    pb: any;
}

export default function BodyContainer({
    children,
    size,
    fluid,
    pb,
}: BodyContainerProps) {
    return (
        <Container fluid={fluid} size={size} className="container" pb={pb}>
            {children}
        </Container>
    );
}
