"use client";

import Link from 'next/link';
import styles from "../styles/HabitsItem.module.css"
import { HabitsItemProps } from '@/types/Habits';

const HabitsItem = ({ name, description, frequency, goalCount, completeCount, habitId, incrementComplete, goalStatus, deleteHabit }: HabitsItemProps) => {
    const increment = () => incrementComplete(habitId);
    const del = () => deleteHabit(habitId);

    return (
        <li className={`${styles.habit} ${styles[goalStatus!]}`}>
            <h3>{name}</h3>
            <p>{frequency}</p>
            <p>{description}</p>
            <p>Completed {completeCount} out of {goalCount}</p>
            <Link className={styles.edit} href={`/habits/${habitId}/edit`}>Edit</Link>
            <button className={styles.button} onClick={increment}>I just did this</button>
            <button className={styles.button} onClick={del}>Delete this habit</button>
        </li>
    );
};

export default HabitsItem;
