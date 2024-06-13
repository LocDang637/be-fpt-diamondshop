"use strict";
module.exports = (sequelize, DataTypes) => {
	const GoldAge = sequelize.define(
		"GoldAge",
		{
			GoldAgeID: {
				type: DataTypes.CHAR(10),
				primaryKey: true,
			},
			GoldAgeName: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
		},
		{
			tableName: "GoldAge",
			timestamps: false,
		},
	);
	return GoldAge;
};
