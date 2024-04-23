import { Notification } from '@mantine/core';

interface ErrorProps {
    errors: any;
}

export default function ErrorMessage({ errors }: ErrorProps) {
    console.log(errors);
    return (
        <Notification color="red" title="Login Error!">
            {errors.map((errors) => (
                <p>{errors.msg}</p>
            ))}
        </Notification>
    );
}
