"use strict";
module.exports = (sequelize, DataTypes) => {
	const GoldType = sequelize.define(
		"GoldType",
		{
			GoldTypeID: {
				type: DataTypes.CHAR(10),
				primaryKey: true,
			},
			GoldTypeName: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
		},
		{
			tableName: "GoldType",
			timestamps: false,
		},
	);
	return GoldType;
};
