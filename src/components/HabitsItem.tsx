"use client";

import Link from 'next/link';
import styles from "../styles/HabitsItem.module.css"
import { HabitsItemProps } from '@/types/Habits';
import CompletionBar from './CompletionBar';
import DifficultyBar from './DifficultyBar';

const HabitsItem = ({ habit, incrementComplete, deleteHabit }: HabitsItemProps) => {

    const increment = () => incrementComplete(habit.id!);
    const del = () => deleteHabit(habit.id!);

    // calculate goalstatus percentage for styling

    // calculate difficulty for styling

    return (
        <li className={`${styles.habit} ${styles[habit.goalStatus!]}`}>
            <h3>{habit.name}</h3>
            <p>{habit.frequency}</p>
            <p>{habit.description}</p>
            <DifficultyBar difficulty={habit.difficulty} />
            <CompletionBar percentComplete={(habit.completeCount / habit.goalCount) * 100} />
            <Link className={styles.edit} href={`/habits/${habit.id}/edit`}>Edit</Link>
            <button className={styles.button} onClick={increment}>I just did this</button>
            <button className={styles.button} onClick={del}>Delete this habit</button>
        </li>
    );
};

export default HabitsItem;
