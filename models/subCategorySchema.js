import { DataTypes } from 'sequelize'
import sequelize, { sequelizeConfig } from '../sequelize.js'


const SubCategorySchema = sequelize.define("sub_category",
    {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type:DataTypes.TEXT("long"),
        allowNull:true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    },
    deleted:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    }

    },
    sequelizeConfig("sub_category")
)

export default SubCategorySchema
