const { DiaPrice } = require("../../models");

// Create a new DiaPrice
exports.create = async (req, res) => {
	try {
		const diaPrice = await DiaPrice.create(req.body);
		res.status(201).json(diaPrice);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all DiaPrices
exports.findAll = async (req, res) => {
	try {
		const diaPrice = await DiaPrice.findAll();
		res.json(diaPrice);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single DiaPrice by ID
exports.findOne = async (req, res) => {
	try {
		const diaPrice = await DiaPrice.findByPk(req.params.id);
		if (diaPrice) {
			res.json(diaPrice);
		} else {
			res.status(404).json({ error: "DiaPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a DiaPrice by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await DiaPrice.update(req.body, {
			where: { DiaPriceID: req.params.id },
		});
		if (updated) {
			const updatedDiaPrice = await DiaPrice.findByPk(req.params.id);
			res.json(updatedDiaPrice);
		} else {
			res.status(404).json({ error: "DiaPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a DiaPrice by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await DiaPrice.destroy({
			where: { DiaPriceID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "DiaPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
