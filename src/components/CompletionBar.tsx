"use client";

import styles from "../styles/CompletionBar.module.css";

const CompletionBar = ({ percentComplete }: { percentComplete: number; }) => {
    let percentStyle = `${styles.completionFill}`;
    let width = `${percentComplete}%`;
    let small = "";
    if (percentComplete > 100) {
        percentStyle = `${styles.completionFill} ${styles.overCompletionFill}`;
        width = "100%";
    } else if (percentComplete <= 0) {
        width = "100%";
        small = styles.empty;
    } else if (percentComplete <= 8) {
        // if percent complete is very low, put percentage text in middle
        width = "8%";
        small = styles.small;
    }
    // note: minimum width should be 40px for mobile

    return (
        <div className={styles.completionBar}>
            <div
                className={`${percentStyle} ${small}`}
                style={{ width: width }}
            >
                {`${Math.round(percentComplete)}%`}
            </div>
        </div>
    );
};

export default CompletionBar;
