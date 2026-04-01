import { getHabitById } from "./habitService";
import { Habit } from "@/types/Habits";

describe("getHabitById", () => {

    test("case: valid id, habit exists, daily frequency, same day", async () => {
        // create a habit with daily frequency and currentCycleStart of today, then call getHabitById and expect completeCount to be unchanged
        const actual = getHabitById("69cb02eab79fb0a7c82b35e2");
        expect(actual).resolves.toEqual(expect.objectContaining({
            id: "69cb02eab79fb0a7c82b35e2",
            name: "Date2",
            frequency: "daily",
            difficulty: 2,
            goalCount: 5,
            completeCount: 6
        }));
    });
});