const { GoldType } = require("../../models");

// Create a new GoldType
exports.create = async (req, res) => {
	try {
		const goldType = await GoldType.create(req.body);
		res.status(201).json(goldType);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all GoldTypes
exports.findAll = async (req, res) => {
	try {
		const goldTypes = await GoldType.findAll();
		res.json(goldTypes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single GoldType by ID
exports.findOne = async (req, res) => {
	try {
		const goldType = await GoldType.findByPk(req.params.id);
		if (goldType) {
			res.json(goldType);
		} else {
			res.status(404).json({ error: "GoldType not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a GoldType by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await GoldType.update(req.body, {
			where: { GoldTypeID: req.params.id },
		});
		if (updated) {
			const updatedGoldType = await GoldType.findByPk(req.params.id);
			res.json(updatedGoldType);
		} else {
			res.status(404).json({ error: "GoldType not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a GoldType by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await GoldType.destroy({
			where: { GoldTypeID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "GoldType not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
