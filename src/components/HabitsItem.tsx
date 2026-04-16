"use client";

import Link from 'next/link';
import styles from "../styles/HabitsItem.module.css";
import { HabitsItemProps } from '@/types/Habits';
import CompletionBar from './CompletionBar';
import DifficultyBar from './DifficultyBar';
import FrequencyLabel from './Frequency';

const HabitsItem = ({ habit, incrementComplete }: HabitsItemProps) => {

    const increment = () => incrementComplete(habit.id!);

    let desc = habit.description && habit.description.length > 0;

    return (
        <li className={styles.habit}>
            <div className={styles.progressItems}>
                <div className={styles.nameAndButton}>
                    <h3 className={styles.habitName}>
                        {habit.name}{desc && (<span className={styles.arrow}> ▶</span>)}
                    </h3>
                    <button className={styles.button} onClick={increment}>I just did this</button>
                </div>
                <CompletionBar percentComplete={(habit.completeCount / habit.goalCount) * 100} />
            </div>
            <div className={styles.statusItems}>
                <div className={styles.frequencyAndEdit}>
                    <FrequencyLabel freq={habit.frequency} goal={habit.goalCount} />
                    <Link href={`/habits/${habit.id}/edit`}>
                        <button className={styles.edit}>Edit</button>
                    </Link>
                </div>
                <DifficultyBar difficulty={habit.difficulty} />
            </div>
            {desc && (<p className={styles.description}>{habit.description}</p>)}
        </li>
    );
};

export default HabitsItem;
