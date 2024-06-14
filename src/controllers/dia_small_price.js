const { DiaSmallPrice } = require("../../models");

// Create a new DiaSmallPrice
exports.create = async (req, res) => {
	try {
		const diaSmallPrice = await DiaSmallPrice.create(req.body);
		res.status(201).json(diaSmallPrice);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all DiaSmallPrices
exports.findAll = async (req, res) => {
	try {
		const diaSmallPrice = await DiaSmallPrice.findAll();
		res.json(diaSmallPrice);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single DiaSmallPrice by ID
exports.findOne = async (req, res) => {
	try {
		const diaSmallPrice = await DiaSmallPrice.findByPk(req.params.id);
		if (diaSmallPrice) {
			res.json(diaSmallPrice);
		} else {
			res.status(404).json({ error: "DiaSmallPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a DiaSmallPrice by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await DiaSmallPrice.update(req.body, {
			where: { DiaSmallPriceID: req.params.id },
		});
		if (updated) {
			const updatedDiaSmallPrice = await DiaSmallPrice.findByPk(req.params.id);
			res.json(updatedDiaSmallPrice);
		} else {
			res.status(404).json({ error: "DiaSmallPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a DiaSmallPrice by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await DiaSmallPrice.destroy({
			where: { DiaSmallPriceID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "DiaSmallPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
