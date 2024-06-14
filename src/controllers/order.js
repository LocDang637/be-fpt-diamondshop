const { Orders } = require("../../models");

// Create a new Orders
exports.create = async (req, res) => {
	try {
		const order = await Orders.create(req.body);
		res.status(201).json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Orderss
exports.findAll = async (req, res) => {
	try {
		const order = await Orders.findAll();
		res.json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Orders by ID
exports.findOne = async (req, res) => {
	try {
		const order = await Orders.findByPk(req.params.id);
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ error: "Orders not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Orders by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Orders.update(req.body, {
			where: { OrdersID: req.params.id },
		});
		if (updated) {
			const updatedOrders = await Orders.findByPk(req.params.id);
			res.json(updatedOrders);
		} else {
			res.status(404).json({ error: "Orders not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Orders by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Orders.destroy({
			where: { OrdersID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Orders not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
