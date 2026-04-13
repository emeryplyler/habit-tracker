import mockingoose from 'mockingoose';
const mongoose = require('mongoose');
import { HabitModel } from "../../src/models/habitModel";
import { getHabitById } from "../../src/services/habitService";
import { goalStatuses, Habit } from "../../src/types/Habits";

const testModel = {
  _id: '111111111111111111111111',
  name: 'name',
  description: 'some description',
  frequency: 'daily',
  difficulty: 3,
  currentCycleStart: new Date(),
  goalCount: 5,
  user: '111111111111111111111111'
};

let eightDaysAgo = new Date();
eightDaysAgo.setDate(eightDaysAgo.getDate() - 8); // subtract 8 days

let mostRecentMonday = new Date();
const dayOfWeek = mostRecentMonday.getDay();
const daysSinceLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
mostRecentMonday.setDate(mostRecentMonday.getDate() - daysSinceLastMonday); // find the most recent monday
mostRecentMonday.setHours(0, 0, 0, 0); // set to start of that monday

const dateModel1 = {
  _id: '111111111111111111111111',
  name: 'name',
  frequency: 'daily',
  difficulty: 1,
  currentCycleStart: eightDaysAgo, // date in past
  goalCount: 2,
  user: '111111111111111111111111',
  completeCount: 5
};

const dateModel2 = {
  _id: '111111111111111111111111',
  name: 'name',
  frequency: 'weekly',
  difficulty: 2,
  currentCycleStart: eightDaysAgo, // more than one week ago; should trigger cycle reset
  goalCount: 3,
  user: '111111111111111111111111',
  completeCount: 3
};

const dateModel3 = {
  _id: '111111111111111111111111',
  name: 'name',
  frequency: 'weekly',
  difficulty: 1,
  currentCycleStart: mostRecentMonday, // should not trigger cycle reset
  goalCount: 3,
  user: '111111111111111111111111',
  completeCount: 3
};

describe('test habitService', () => {

  beforeAll(() => {
    jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true); // make sure all ObjectId strings are considered valid for testing purposes
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('getHabitById: service returns habit, ', async () => {

    // Arrange
    mockingoose(HabitModel).toReturn(testModel, 'findOne'); // make findOne always return testModel, no matter the input

    // Act
    const actual: Habit = await getHabitById("111"); // try to retrieve habit

    // Assert
    expect(actual.difficulty).toBe(3); // check if returned habit matches testModel
    expect(actual.description).toBe('some description');
    expect(actual.frequency).toBe('daily');
  });

  test('getHabitById: goalStatus default to incomplete ', async () => {

    // Arrange
    mockingoose(HabitModel).toReturn(testModel, 'findOne'); // arrange again

    // Act
    const actual: Habit = await getHabitById("111111111111111111111111");

    // Assert
    expect(actual.goalStatus).toBe('incomplete'); // testModel does not have goalStatus, so it should default to 'incomplete'; that logic is in habitService.ts
  });

  test('getHabitById: update cycle start and reset completeCount for daily habit', async () => {
    // arrange
    mockingoose(HabitModel).toReturn(dateModel1, 'findOne'); // arrange findOne to return a habit with currentCycleStart in the past

    // act
    const actual: Habit = await getHabitById("111111111111111111111111"); // try to retrieve habit, which should trigger the logic to update cycle start and reset completeCount

    // assert
    expect(actual.completeCount).toBe(0); // completeCount should be reset to 0
    expect(actual.goalStatus).toBe('incomplete'); // goalStatus should be 'incomplete'
  });

  test('getHabitById: update cycle start and reset completeCount for weekly habit', async () => {
    // Arrange
    mockingoose(HabitModel).toReturn(dateModel2, 'findOne'); // return weekly habit with cycle start more than one week ago

    // Act
    const actual: Habit = await getHabitById("111111111111111111111111");

    // Assert
    expect(actual.completeCount).toBe(0); // completeCount should be reset to 0
    expect(actual.goalStatus).toBe('incomplete'); // goalStatus should be 'incomplete'
  });

  test('getHabitById: do not update cycle start or reset completeCount if not necessary', async () => {
    // Arrange
    mockingoose(HabitModel).toReturn(dateModel3, 'findOne'); // return weekly habit with cycle start at most recent monday, so it should not trigger cycle reset

    // Act
    const actual: Habit = await getHabitById("111111111111111111111111");

    // Assert
    expect(actual.completeCount).toBe(3); // completeCount should not be reset, so it should still be 3
    expect(actual.goalStatus).toBe('complete'); // goalStatus should be 'complete' since completeCount equals goalCount
  });
});
