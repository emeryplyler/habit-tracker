"use client";

import styles from "../styles/DifficultyBar.module.css";

const DifficultyBar = ({ difficulty }: { difficulty: number; }) => {
    let width = `${difficulty / 5 * 100}%`;

    return (
        <div className={styles.base}>
            <p className={styles.label}>Difficulty: {difficulty}/5</p>
            <div className={styles.completionBar}>
                <div
                    className={`${styles.completionFill} ${styles[`bgc${difficulty}`]}`}
                    style={{ width: width }}
                >
                </div>
            </div>
        </div>


    );
};

export default DifficultyBar;
