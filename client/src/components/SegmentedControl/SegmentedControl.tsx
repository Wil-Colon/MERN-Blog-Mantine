import { Button, SegmentedControl } from '@mantine/core';
import classes from './segmentedcontrol.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '@mantine/hooks';

export function GradientSegmentedControl() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const [currentPage, setCurrentPage] = useSessionStorage({
        key: 'current-page',
        defaultValue: '',
    });

    const change = (value: string) => {
        setValue(value);
        setCurrentPage(value);
    };

    useEffect(() => {
        setValue(currentPage);
        navigate(`/${currentPage}`);
    }, [value, navigate, setCurrentPage, currentPage]);

    return (
        <SegmentedControl
            value={value}
            onChange={(value) => change(value)}
            radius="xl"
            size="md"
            data={[
                { label: 'Home', value: '' },
                { label: 'About', value: 'about' },
                { label: 'Blogs', value: 'blogs' },
                { label: 'Sign up', value: 'signin' },
            ]}
            classNames={classes}
        />
    );
}
