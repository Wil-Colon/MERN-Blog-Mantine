import { Notification } from '@mantine/core';

interface ErrorProps {
    title: string;
    errors: any;
}

export default function ErrorMessage({ title, errors }: ErrorProps) {
    return (
        <Notification color="red" title={title}>
            {errors.map((errors, i) => (
                <p key={i}>{errors.msg}</p>
            ))}
        </Notification>
    );
}
