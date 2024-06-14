const { Diamond } = require("../../models");

// Create a new Diamond
exports.create = async (req, res) => {
	try {
		const diamond= await Diamond.create(req.body);
		res.status(201).json(diamond);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Diamonds
exports.findAll = async (req, res) => {
	try {
		const diamond = await Diamond.findAll();
		console.log(diamond);
		res.json(diamond);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Diamond by ID
exports.findOne = async (req, res) => {
	try {
		const diamond= await Diamond.findByPk(req.params.id);
		if (diamond) {
			res.json(diamond);
		} else {
			res.status(404).json({ error: "Diamond not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Diamond by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Diamond.update(req.body, {
			where: { DiamondID: req.params.id },
		});
		if (updated) {
			const updatedDiamond = await Diamond.findByPk(req.params.id);
			res.json(updatedDiamond);
		} else {
			res.status(404).json({ error: "Diamond not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Diamond by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Diamond.destroy({
			where: { DiamondID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Diamond not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
