import Controller from './controller.js';
import ReadingModels from '../models/index.js';
// import { Model, ModelStatic } from 'sequelize';

const ReadingControllers = {};
// const ReadingControllers: Record<string, ReturnType<typeof Controller>> = {};

for (const modelName in ReadingModels) {
  //const model = ReadingModels[modelName] as ModelStatic<Model>;
  const model = ReadingModels[modelName];
  ReadingControllers[modelName] = Controller(model);
}

export default ReadingControllers;
