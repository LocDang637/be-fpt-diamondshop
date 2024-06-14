const { Role } = require("../../models");

// Create a new Role
exports.create = async (req, res) => {
	try {
		const role = await Role.create(req.body);
		res.status(201).json(role);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Roles
exports.findAll = async (req, res) => {
	try {
		const role = await Role.findAll();
		res.json(role);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Role by ID
exports.findOne = async (req, res) => {
	try {
		const role = await Role.findByPk(req.params.id);
		if (role) {
			res.json(role);
		} else {
			res.status(404).json({ error: "Role not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Role by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Role.update(req.body, {
			where: { RoleID: req.params.id },
		});
		if (updated) {
			const updatedRole = await Role.findByPk(req.params.id);
			res.json(updatedRole);
		} else {
			res.status(404).json({ error: "Role not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Role by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Role.destroy({
			where: { RoleID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Role not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
