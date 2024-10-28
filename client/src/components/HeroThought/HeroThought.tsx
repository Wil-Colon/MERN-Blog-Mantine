import './herothought.scss';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import LikeButton, { LikeButtonsNonUser } from '../LikeButton/LikeButton';

interface HeroThoughtProps {
    selectedThought: any;
}

export default function HeroThought({ selectedThought }: HeroThoughtProps) {
    const dateFormat = moment(selectedThought.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );

    const user = useSelector((state: RootState) => state.user.currentUser);

    return (
        <>
            <p>"{selectedThought.title}"</p>
            <br />
            <p>{selectedThought.body}</p>
            <br />
            <small style={{ fontStyle: 'italic' }}>{dateFormat}</small>
            {user ? (
                <LikeButton selectedThought={selectedThought} />
            ) : (
                <LikeButtonsNonUser selectedThought={selectedThought} />
            )}
        </>
    );
}
