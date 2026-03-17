"use client";

interface HabitsItemProps {
    name: string,
    description: string,
    frequency: string,
    goalCount: number,
    completeCount: number,
    habitId: string,
    cb: (habitId: string) => void;
}

const HabitsItem = ({ name, description, frequency, goalCount, completeCount, habitId, cb }: HabitsItemProps) => {
    const callb = () => cb(habitId);
    return (
        <li className="habits-item">
            <h3>{name}</h3>
            <p>{frequency}</p>
            <p>{description}</p>
            <p>Completed {completeCount} out of {goalCount}</p>
            <button className="habit-increment-button" onClick={callb}>I just did this</button>
        </li>
    );
};

export default HabitsItem;
