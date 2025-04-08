import { Op } from 'sequelize';

const Controller = (model) => {
    // Get all records with optional pagination and filtering
    const getAll = async (req, res) => {
        try {
            const { page = 1, size = 20, search, ...filters } = req.query;
            const limit = parseInt(size);
            const offset = (page - 1) * limit;

            const where = {};

            // Operator mapping
            const operatorMap = {
                '_lt': Op.lt,
                '_lte': Op.lte,
                '_gt': Op.gt,
                '_gte': Op.gte,
                '_ne': Op.ne,
                '_like': Op.iLike,
                '_in': Op.in,
            };

            // Handle searching
            if (search) {
                where[Op.or] = [
                    { value: { [Op.iLike]: `%${search}%` } },
                    { createdAt: { [Op.iLike]: `%${search}%` } },
                ];
            }

            // Check for min* parameters
            const minParam = Object.entries(req.query).find(
                ([key, value]) => key.startsWith('min') && value === 'true'
            );

            const maxParam = Object.entries(req.query).find(
                ([key, value]) => key.startsWith('max') && value === 'true'
            );

            if (minParam) {
                const [key] = minParam;
                const column = key.slice(3).toLowerCase();
                const minValue = await model.min(column);
                
                if (minValue === null) {
                    return res.status(404).json({ message: 'No data found for minimum calculation' });
                }
                
                return res.status(200).json({ 
                    column: column,
                    minimum: minValue 
                });
            }

            if (maxParam) {
                const [key] = maxParam;
                const column = key.slice(3).toLowerCase();
                const maxValue = await model.max(column);
                
                if (maxValue === null) {
                    return res.status(404).json({ message: 'No data found for minimum calculation' });
                }
                
                return res.status(200).json({ 
                    column: column,
                    maximum: maxValue
                });
            }

            // Advanced filtering
            for (const [rawKey, value] of Object.entries(filters)) {
                let matched = false;

                for (const [suffix, op] of Object.entries(operatorMap)) {
                    if (rawKey.endsWith(suffix)) {
                        const field = rawKey.slice(0, -suffix.length);
                        const finalValue = op === Op.in ? value.split(',') : value;
                        if (!where[field]) where[field] = {};
                        where[field][op] = finalValue;
                        matched = true;
                        break;
                    }
                }

                if (!matched) {
                    if (rawKey.startsWith("~")) {
                        const field = rawKey.slice(1);
                        where[field] = { [Op.iLike]: `%${value}%` };
                    } else {
                        where[rawKey] = value;
                    }
                }
            }

            // Fetch data from model
            const { rows, count } = await model.findAndCountAll({
                where,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            res.status(200).json({
                data: rows,
                total: count,
                page: parseInt(page),
                size: rows.length,
                totalPages: Math.ceil(count / limit),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving data', error });
        }
    };

    // Get a single record by ID
    const getOne = async (req, res) => {
        try {
            const { id } = req.params;
            const record = await model.findByPk(id);

            if (!record) {
                res.status(404).json({ message: `${model.name} not found` });
            }

            res.status(200).json(record);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving data', error });
        }
    };

    // Create a new record
    const create = async (req, res) => {
        try {
            const record = await model.create(req.body);
            res.status(201).json(record);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating data', error });
        }
    };

    // Update an existing record by ID
    const update = async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await model.update(req.body, { where: { id } });

            if (!updated) {
                res.status(404).json({ message: `${model.name} not found` });
            }

            const updatedRecord = await model.findByPk(id);
            res.status(200).json(updatedRecord);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating data', error });
        }
    };

    // Delete a record by ID
    const deleteOne = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await model.destroy({ where: { id } });

            if (!deleted) {
                res.status(404).json({ message: `${model.name} not found` });
            }

            res.status(204).json({ message: `${model.name} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting data', error });
        }
    };

    // Search functionality - can be used as a standalone route or with getAll
    const search = async (req, res) => {
        try {
            const { search } = req.query;
            if (!search) {
                res.status(400).json({ message: 'Search term is required' });
            }

            const records = await model.findAll({
                where: {
                    value: { [Op.iLike]: `%${search}%` },
                },
            });

            res.status(200).json(records);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error performing search', error });
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        deleteOne,
        search,
    };
};

export default Controller;
