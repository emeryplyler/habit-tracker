"use client";

import styles from "../styles/DifficultyBar.module.css";

const DifficultyBar = ({ difficulty }: { difficulty: number; }) => {
    let width = `${difficulty / 5 * 100}%`;

    return (
        <div className={styles.completionBar}>
            <p className={styles.easy}>Easy</p>
            <div
                className={styles.completionFill}
                style={{ width: width }}
            >
            </div>
            <p className={styles.hard}>Hard</p>
        </div>

    );
};

export default DifficultyBar;
