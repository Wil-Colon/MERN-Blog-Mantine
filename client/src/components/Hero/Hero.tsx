import classes from './hero.module.scss';
import Divider from '../Divider/Divider';
import HeroThought from '../HeroThought/HeroThought';
import { Overlay, Container, Avatar } from '@mantine/core';

interface HeroProps {
    selectedThought: any;
}

export default function Hero({ selectedThought }: HeroProps) {
    return (
        <div className={classes.hero}>
            <Overlay className={classes.root} opacity={1} zIndex={0} />
            <Container className={classes.container} size="md">
                {selectedThought !== null ? (
                    <>
                        <HeroThought selectedThought={selectedThought} />
                        <Avatar
                            className={classes.avatar}
                            src={selectedThought.avatar}
                        />
                    </>
                ) : (
                    <p>loading</p>
                )}
            </Container>
            <Divider />
        </div>
    );
}
