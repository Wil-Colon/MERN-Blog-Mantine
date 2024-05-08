import {
    useMantineColorScheme,
    Button,
    useComputedColorScheme,
} from '@mantine/core';
import classes from './darkModeBtn.module.scss';

import { IconSun, IconMoon } from '@tabler/icons-react';

export default function DarkModeBtn() {
    const { colorScheme, setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    });

    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button
            className={classes.root}
            variant="transparent"
            onClick={() => toggleColorScheme()}
            pl={0}
        >
            {computedColorScheme === 'light' ? <IconMoon /> : <IconSun />}
        </Button>
    );
}
