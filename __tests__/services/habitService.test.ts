import mockingoose from 'mockingoose';
const mongoose = require('mongoose');
import { HabitModel } from "../../src/models/habitModel";
import { getHabitById } from "../../src/services/habitService";
import { Habit } from "../../src/types/Habits";

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
});
