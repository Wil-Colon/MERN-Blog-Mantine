import moment from 'moment';

interface HeroThoughtProps {
    selectedThought: any;
}

export default function HeroThought({ selectedThought }: HeroThoughtProps) {
    let dateFormat = moment(selectedThought.date, moment.ISO_8601).format(
        'YYYY-MM-DD'
    );

    return (
        <>
            <p>"{selectedThought.title}"</p>
            <br />
            <p>{selectedThought.body}</p>
            <br />
            <small style={{ fontStyle: 'italic' }}>{dateFormat}</small>
        </>
    );
}
