const { DiamondSmall } = require("../../models");

// Create a new DiamondSmall
exports.create = async (req, res) => {
	try {
		const diamondSmall = await DiamondSmall.create(req.body);
		res.status(201).json(diamondSmall);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all DiamondSmalls
exports.findAll = async (req, res) => {
	try {
		const diamondSmall = await DiamondSmall.findAll();
		res.json(diamondSmall);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single DiamondSmall by ID
exports.findOne = async (req, res) => {
	try {
		const diamondSmall = await DiamondSmall.findByPk(req.params.id);
		if (diamondSmall) {
			res.json(diamondSmall);
		} else {
			res.status(404).json({ error: "DiamondSmall not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a DiamondSmall by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await DiamondSmall.update(req.body, {
			where: { DiamondSmallID: req.params.id },
		});
		if (updated) {
			const updatedDiamondSmall = await DiamondSmall.findByPk(req.params.id);
			res.json(updatedDiamondSmall);
		} else {
			res.status(404).json({ error: "DiamondSmall not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a DiamondSmall by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await DiamondSmall.destroy({
			where: { DiamondSmallID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "DiamondSmall not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
