"use client";

import styles from "../styles/CompletionBar.module.css";

const CompletionBar = ({ percentComplete }: { percentComplete: number; }) => {
    let percentStyle = styles.completionFill;
    let width = `${percentComplete}%`;
    if (percentComplete > 100) {
        percentStyle = styles.overCompletionFill;
        width = "100%";
    }

    return (
        <div className={styles.completionBar}>
            <div
                className={percentStyle}
                style={{ width: width }}
            >
                {`${Math.round(percentComplete)}%`}
            </div>
        </div>
    );
};

export default CompletionBar;
