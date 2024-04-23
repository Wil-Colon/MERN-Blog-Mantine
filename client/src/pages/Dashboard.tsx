import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/actions/auth';
import { useEffect } from 'react';

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    return <div>Dashboard</div>;
}
