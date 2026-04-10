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
    jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('getHabitById: no error when user is not defined, ', async () => {

    // Arrange
    mockingoose(HabitModel).toReturn(testModel, 'findOne');

    // Act
    const actual: Habit = await getHabitById("111111111111111111111111");

    // Assert
    expect(actual.difficulty).toBe(3);
    expect(actual.description).toBe('some description');
    expect(actual.frequency).toBe('daily');
  });

  test('getHabitById: goalStatus default to incomplete ', async () => {

    // Arrange
    mockingoose(HabitModel).toReturn(testModel, 'findOne');

    // Act
    const actual: Habit = await getHabitById("111111111111111111111111");

    // Assert
    expect(actual.goalStatus).toBe('incomplete');
  });
});
