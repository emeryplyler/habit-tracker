"use client";

import Link from 'next/link';
import styles from "../styles/HabitsItem.module.css";
import { HabitsItemProps } from '@/types/Habits';
import CompletionBar from './CompletionBar';
import DifficultyBar from './DifficultyBar';

const HabitsItem = ({ habit, incrementComplete }: HabitsItemProps) => {

    const increment = () => incrementComplete(habit.id!);

    return (
        <li className={`${styles.habit} ${styles[habit.goalStatus!]}`}>
            <div className={styles.progressItems}>
                <div className={styles.nameAndButton}>
                    <h3>{habit.name}</h3>
                    <button className={styles.button} onClick={increment}>I just did this</button>                    
                </div>
                <CompletionBar percentComplete={(habit.completeCount / habit.goalCount) * 100} />
            </div>
            <div className={styles.statusItems}>
                <div className={styles.frequencyAndEdit}>
                    <p>{habit.frequency}</p>
                    <Link className={styles.edit} href={`/habits/${habit.id}/edit`}>Edit</Link>                    
                </div>
                <DifficultyBar difficulty={habit.difficulty} />
            </div>
            <p className={styles.description}>{habit.description}</p>
        </li>
    );
};

export default HabitsItem;
