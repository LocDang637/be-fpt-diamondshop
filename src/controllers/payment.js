const { Payment } = require("../../models");

// Create a new Payment
exports.create = async (req, res) => {
	try {
		const payment = await Payment.create(req.body);
		res.status(201).json(payment);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Payments
exports.findAll = async (req, res) => {
	try {
		const payment = await Payment.findAll();
		res.json(payment);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Payment by ID
exports.findOne = async (req, res) => {
	try {
		const payment = await Payment.findByPk(req.params.id);
		if (payment) {
			res.json(payment);
		} else {
			res.status(404).json({ error: "Payment not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Payment by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Payment.update(req.body, {
			where: { PaymentID: req.params.id },
		});
		if (updated) {
			const updatedPayment = await Payment.findByPk(req.params.id);
			res.json(updatedPayment);
		} else {
			res.status(404).json({ error: "Payment not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Payment by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Payment.destroy({
			where: { PaymentID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Payment not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
