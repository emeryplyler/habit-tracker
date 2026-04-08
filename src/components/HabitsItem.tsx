"use client";

import Link from 'next/link';
import styles from "../styles/HabitsItem.module.css";
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
            <div className={styles.progressItems}>
                <h3>{habit.name}</h3>
                <button className={styles.button} onClick={increment}>I just did this</button>
                <CompletionBar percentComplete={(habit.completeCount / habit.goalCount) * 100} />
            </div>
            <div className={styles.statusItems}>
                <p>{habit.frequency}</p>
                <DifficultyBar difficulty={habit.difficulty} />
                <Link className={styles.edit} href={`/habits/${habit.id}/edit`}>Edit</Link>
            </div>
            <p className={styles.description}>{habit.description}</p>
            {/* <button className={styles.button} onClick={del}>Delete this habit</button> */}
        </li>
    );
};

export default HabitsItem;
