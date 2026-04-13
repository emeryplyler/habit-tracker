export interface Habit {
    id?: string,
    name: string,
    description?: string,
    frequency: string,
    notes?: string,
    difficulty: number,
    goalCount: number,
    completeCount: number,
    incrementCompleteCount?: number,
    goalStatus?: goalStatuses;
    userId: string,
}

export interface HabitsItemProps {
    habit: Habit
    incrementComplete: (habitId: string) => void;
}

export enum goalStatuses {
    INCOMPLETE = "incomplete",
    COMPLETE = "complete",
    SURPASSED = "surpassed"
}
