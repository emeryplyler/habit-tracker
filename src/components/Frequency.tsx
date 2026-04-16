"use client";

const FrequencyLabel = ({ freq, goal }: { freq: string; goal: number; }) => {
    let label = "";

    if (goal === 1) {
        label += "1 time";
    } else {
        label += `${goal} times`;
    }

    if (freq === "daily") {
        label += " per day";
    } else {
        label += " per week";
    }

    return (
        <div>
            {label}
        </div>
    );
};

export default FrequencyLabel;
