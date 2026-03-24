export interface HabitsItemProps {
    name: string,
    description: string,
    frequency: string,
    goalCount: number,
    completeCount: number,
    habitId: string,
    incrementComplete: (habitId: string) => void;
}
