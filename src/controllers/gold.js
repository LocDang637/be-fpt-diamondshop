const { Gold } = require("../../models");

// Create a new Gold
exports.create = async (req, res) => {
	try {
		const gold = await Gold.create(req.body);
		res.status(201).json(gold);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Golds
exports.findAll = async (req, res) => {
	try {
		const { goldTypeID, goldAgeID } = req.query;
		const where = {};

		if (goldTypeID) where.GoldTypeID = goldTypeID;
		if (goldAgeID) where.GoldAgeID = goldAgeID;

		const golds = await Gold.findAll({ where });
		res.json(golds);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Gold by ID
exports.findOne = async (req, res) => {
	try {
		const gold = await Gold.findByPk(req.params.id);
		if (gold) {
			res.json(gold);
		} else {
			res.status(404).json({ error: "Gold not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Gold by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Gold.update(req.body, {
			where: { GoldID: req.params.id },
		});
		if (updated) {
			const updatedGold = await Gold.findByPk(req.params.id);
			res.json(updatedGold);
		} else {
			res.status(404).json({ error: "Gold not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Gold by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Gold.destroy({
			where: { GoldID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Gold not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
