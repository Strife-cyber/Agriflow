import { DataTypes, Model } from "sequelize";

class Reading extends Model {
    static baseInit(attributes, options, sequelize) {
        const readingModel = this; // This ensures that `this` refers to the actual model
        return readingModel.init({
            value: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            ...attributes
        }, {
            timestamps: true,
            ...options,
            sequelize
        });
    }
}

class LightReading extends Reading {
    static baseInit(attributes, options, sequelize){
        return super.baseInit({
            unit: {
                type: DataTypes.STRING,
                defaultValue: "Lux"
            }
        }, {
            modelName: 'LightReading',
            tableName: 'light_readings'
        }, sequelize);
    }
}

class TemperatureReading extends Reading {
    static baseInit(attributes, options, sequelize){
        return super.baseInit({
            unit: {
                type: DataTypes.STRING,
                defaultValue: "\u2103"
            }
        }, {
            modelName: 'TemperatureReading',
            tableName: 'temperature_readings'
        }, sequelize)
    }
}

class Co2LevelReading extends Reading {
    static baseInit(attributes, options, sequelize){
        return super.baseInit({
            unit: {
                type: DataTypes.STRING,
                defaultValue: "ppm" // parts per million
            }
        }, {
            modelName: 'Co2LevelReading',
            tableName: 'co2_level_readings'
        }, sequelize);
    }
}

class SoilHumidityReading extends Reading {
    static baseInit(attributes, options, sequelize){
        return super.baseInit({
            unit: {
                type: DataTypes.STRING,
                defaultValue: "%"
            }
        }, {
            modelName: 'SoilHumidityReading',
            tableName: 'soil_humidity_readings'
        }, sequelize);
    }
}

class WaterTankReading extends Reading {
    static baseInit(attributes, options, sequelize){
        return super.baseInit({
            unit: {
                type: DataTypes.STRING,
                defaultValue: "%"
            }
        }, {
            modelName: 'WaterTankReading',
            tableName: 'water_tank_readings'
        }, sequelize);
    }
}

let models = {
    LightReading,
    TemperatureReading,
    Co2LevelReading,
    SoilHumidityReading,
    WaterTankReading
}


export default models;
