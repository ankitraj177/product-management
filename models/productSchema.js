import { DataTypes } from "sequelize";
import sequelize, { sequelizeConfig } from "../sequelize.js";

const ProductSchema = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    min_purchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tags: {
      type: DataTypes.TEXT('long'),  
      allowNull: true,
      defaultValue: "[]" 
      
    },
    low_stock_warning: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    gallery_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video_provider: {
      type: DataTypes.ENUM("Youtube", "DailyMotion", "Vimeo"),
      allowNull: true,
    },
    video_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_variation_colors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_variation_attributes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    discount_date_from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    discount_date_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    discount_type: {
      type: DataTypes.ENUM("FLAT", "PERCENTAGE"),
      allowNull: true,
      defaultValue: "FLAT",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    pdf_specification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.TEXT, // Removed "long" option
      allowNull: true,
    },
    meta_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock_visibility: {
      type: DataTypes.ENUM(
        "SHOW_STOCK_QUANTITY",
        "SHOW_STOCK_WITH_TEXT_ONLY",
        "HIDE_STOCK"
      ),
      allowNull: true,
      defaultValue: "SHOW_STOCK_QUANTITY",
    },
    cash_on_delivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    todays_deal: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flash_deal_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flash_deal_discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    flash_deal_discount_type: {
      type: DataTypes.ENUM("FLAT", "PERCENTAGE"),
      allowNull: true,
      defaultValue: "FLAT",
    },
    shipping_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    tax_type: {
      type: DataTypes.ENUM("FLAT", "PERCENTAGE"),
      allowNull: true,
      defaultValue: "FLAT",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  sequelizeConfig("product")
);

export default ProductSchema;
