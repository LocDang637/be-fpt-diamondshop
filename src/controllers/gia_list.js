const { GIAList } = require("../../models");

// Create a new GIAList
exports.create = async (req, res) => {
	try {
		const giaList = await GIAList.create(req.body);
		res.status(201).json(giaList);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all GIALists
exports.findAll = async (req, res) => {
	try {
		const giaLists = await GIAList.findAll();
        console.log(giaLists);
		res.json(giaLists);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single GIAList by ID
exports.findOne = async (req, res) => {
	try {
		const giaList = await GIAList.findByPk(req.params.id);
		if (giaList) {
			res.json(giaList);
		} else {
			res.status(404).json({ error: "GIAList not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a GIAList by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await GIAList.update(req.body, {
			where: { GIAListID: req.params.id },
		});
		if (updated) {
			const updatedGIAList = await GIAList.findByPk(req.params.id);
			res.json(updatedGIAList);
		} else {
			res.status(404).json({ error: "GIAList not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a GIAList by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await GIAList.destroy({
			where: { GIAListID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "GIAList not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
