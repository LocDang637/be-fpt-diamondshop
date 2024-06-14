const { Product } = require("../../models");

// Create a new Product
exports.create = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Products
exports.findAll = async (req, res) => {
	try {
		const product = await Product.findAll();
		res.json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Product by ID
exports.findOne = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Product by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Product.update(req.body, {
			where: { ProductID: req.params.id },
		});
		if (updated) {
			const updatedProduct = await Product.findByPk(req.params.id);
			res.json(updatedProduct);
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Product by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Product.destroy({
			where: { ProductID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
