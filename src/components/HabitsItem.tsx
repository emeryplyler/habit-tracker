"use client";

import Link from 'next/link';
import styles from "../styles/HabitsItem.module.css"
import { HabitsItemProps } from '@/types/Habits';

const HabitsItem = ({ name, description, frequency, goalCount, completeCount, habitId, incrementComplete }: HabitsItemProps) => {
    const increment = () => incrementComplete(habitId);
    return (
        <li className={styles.habit}>
            <h3>{name}</h3>
            <p>{frequency}</p>
            <p>{description}</p>
            <p>Completed {completeCount} out of {goalCount}</p>
            <Link className={styles.edit} href={`/habits/${habitId}/edit`}>Edit</Link>
            <button className={styles.button} onClick={increment}>I just did this</button>
        </li>
    );
};

export default HabitsItem;
