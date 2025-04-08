import models from './model.js';
import sequelize from '../config.js';
// import { Model, ModelStatic } from 'sequelize';

const ReadingModels = {}
//const ReadingModels: Record<string, ModelStatic<Model>> = {}

const initModels = () => {
    for (const modelName in models) {
        const model = models[modelName];
        //const model = models[modelName] as ModelStatic<Model>;
        if ('baseInit' in model && typeof model.baseInit === 'function') {
            ReadingModels[modelName] = model.baseInit({}, {}, sequelize);
        }
    }
};

initModels();

export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ Database & tables created!');
    } catch (error) {
        console.error('❌ Database sync failed:', error);
        throw error;
    }
};

export default ReadingModels;
