export interface HabitsItemProps {
    name: string,
    description: string,
    frequency: string,
    goalCount: number,
    completeCount: number,
    habitId: string,
    incrementComplete: (habitId: string) => void;
    goalStatus?: goalStatuses;
}

export interface newHabit {
    name: string,
    description?: string,
    frequency: string,
    notes?: string,
    difficulty: number,
    goalCount: number
}

export enum goalStatuses {
    INCOMPLETE = "incomplete",
    COMPLETE = "complete",
    SURPASSED = "surpassed"
}
