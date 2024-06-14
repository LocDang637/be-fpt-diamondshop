const { Promotion } = require("../../models");

// Create a new Promotion
exports.create = async (req, res) => {
	try {
		const promotion = await Promotion.create(req.body);
		res.status(201).json(promotion);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Promotions
exports.findAll = async (req, res) => {
	try {
		const promotion = await Promotion.findAll();
		res.json(promotion);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Promotion by ID
exports.findOne = async (req, res) => {
	try {
		const promotion = await Promotion.findByPk(req.params.id);
		if (promotion) {
			res.json(promotion);
		} else {
			res.status(404).json({ error: "Promotion not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Promotion by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Promotion.update(req.body, {
			where: { PromotionID: req.params.id },
		});
		if (updated) {
			const updatedPromotion = await Promotion.findByPk(req.params.id);
			res.json(updatedPromotion);
		} else {
			res.status(404).json({ error: "Promotion not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Promotion by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Promotion.destroy({
			where: { PromotionID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Promotion not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
