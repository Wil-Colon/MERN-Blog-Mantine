import classes from './hero.module.scss';
import Divider from '../Divider/Divider';
import HeroThought from '../HeroThought/HeroThought';
import { Overlay, Container, Avatar, Loader, Center } from '@mantine/core';
import { useEffect, useState } from 'react';

interface HeroProps {
    selectedThought: any;
}

export default function Hero({ selectedThought }: HeroProps) {
    const [thought, setThought] = useState(selectedThought);

    useEffect(() => {
        selectedThought !== null && setThought(selectedThought);
    }, [selectedThought]);

    return (
        <div className={classes.hero}>
            <Overlay className={classes.root} opacity={1} zIndex={0} />
            <Container className={classes.container} size="md">
                {thought !== null ? (
                    <>
                        <HeroThought selectedThought={selectedThought} />
                        <Avatar
                            className={classes.avatar}
                            src={thought.Avatar}
                        />
                    </>
                ) : (
                    <p>Loading Thought...</p>
                )}
            </Container>
            <Divider />
        </div>
    );
}
