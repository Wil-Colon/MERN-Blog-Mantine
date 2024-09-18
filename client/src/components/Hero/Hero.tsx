import classes from './hero.module.scss';
import { Overlay, Container, Avatar, Loader, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Divider from '../Divider/Divider';

interface HeroProps {
    selectedThought: any;
}

export default function Hero({ selectedThought }: HeroProps) {
    const [thought, setThought] = useState(selectedThought);
    let dateFormat;

    useEffect(() => {
        selectedThought !== null && setThought(selectedThought);
    }, [selectedThought]);

    thought !== null
        ? (dateFormat = moment(thought.date, moment.ISO_8601).format(
              'YYYY-MM-DD'
          ))
        : null;

    return (
        <div className={classes.hero}>
            <Overlay className={classes.root} opacity={1} zIndex={0} />
            <Container className={classes.container} size="md">
                {thought !== null ? (
                    <>
                        {' '}
                        <p>"{thought.title}"</p>
                        <br />
                        <p>{thought.body}</p>
                        <br />
                        <small style={{ fontStyle: 'italic' }}>
                            {dateFormat}
                        </small>
                    </>
                ) : (
                    <p>Loading Thought...</p>
                )}
                {thought !== null ? (
                    <Avatar className={classes.avatar} src={thought.Avatar} />
                ) : (
                    <Center>
                        <Loader color="green" size={20} />
                    </Center>
                )}
            </Container>
            <Divider />
        </div>
    );
}
