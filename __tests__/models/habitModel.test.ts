import mockingoose from 'mockingoose';
import { HabitModel } from "../../src/models/habitModel";

describe('test mongoose Habit Model', () => {

  test('should return the model with findById', async() => {
    // Arrange
    const testModel = {
      _id: '111111111111111111111111',
      name: 'name',
      description: 'some description',
      frequency: 'daily',
      difficulty: 3,
      goalCount: 5
    };
    mockingoose(HabitModel).toReturn(testModel, 'findOne');

    // Act
    const theModel = await HabitModel.findById({ _id: '111111111111111111111111' });
    const resultModel = JSON.parse(JSON.stringify(theModel));

    // Assert
    expect(resultModel).toMatchObject(testModel);
  });
});
