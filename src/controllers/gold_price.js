const { GoldPrice } = require("../../models");

exports.create = async (req, res) => {
	try {
		const goldPrice = await GoldPrice.create(req.body);
		res.status(201).json(goldPrice);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.findAll = async (req, res) => {
	try {
		const goldPrices = await GoldPrice.findAll();
		res.json(goldPrices);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.findOne = async (req, res) => {
	try {
		const goldPrice = await GoldPrice.findByPk(req.params.id);
		if (goldPrice) {
			res.json(goldPrice);
		} else {
			res.status(404).json({ error: "GoldPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.update = async (req, res) => {
	try {
		const [updated] = await GoldPrice.update(req.body, {
			where: { GoldPriceID: req.params.id },
		});
		if (updated) {
			const updatedGoldPrice = await GoldPrice.findByPk(req.params.id);
			res.json(updatedGoldPrice);
		} else {
			res.status(404).json({ error: "GoldPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const deleted = await GoldPrice.destroy({
			where: { GoldPriceID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "GoldPrice not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
