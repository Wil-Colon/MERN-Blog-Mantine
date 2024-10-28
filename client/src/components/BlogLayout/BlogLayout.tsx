import { Button, Flex } from '@mantine/core';
import BodyContainer from '../BodyContainer/BodyContainer';

export default function BlogLayout() {
    return (
        <BodyContainer size="lg">
            <Flex
                mih={50}
                bg="rgba(0, 0, 0, .3)"
                gap="md"
                justify="flex-start"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
            </Flex>
        </BodyContainer>
    );
}
