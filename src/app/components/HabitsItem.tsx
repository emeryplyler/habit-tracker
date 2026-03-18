"use client";

import Link from 'next/link';

interface HabitsItemProps {
    name: string,
    description: string,
    frequency: string,
    goalCount: number,
    completeCount: number,
    habitId: string,
    incrementComplete: (habitId: string) => void;
}

const HabitsItem = ({ name, description, frequency, goalCount, completeCount, habitId, incrementComplete }: HabitsItemProps) => {
    const increment = () => incrementComplete(habitId);
    return (
        <li className="habits-item">
            <h3>{name}</h3>
            <p>{frequency}</p>
            <p>{description}</p>
            <p>Completed {completeCount} out of {goalCount}</p>
            <Link href={`/habits/${habitId}/edit`}>Edit</Link>
            <button className="habit-increment-button" onClick={increment}>I just did this</button>
        </li>
    );
};

export default HabitsItem;
