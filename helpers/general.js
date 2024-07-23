import { makeDb } from "../db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { DataTypes } from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = makeDb();

/**Function to create query builder for insert */
export const createQueryBuilder = (model, requestBody) => {
  if (!model) {
    throw new Error("Model is undefined or null.");
  }
  requestBody = JSON.parse(JSON.stringify(requestBody));
  const columns = Object.keys(model.rawAttributes);
  const filteredColumns = columns.filter((column) => {
    return (
      requestBody.hasOwnProperty(column) &&
      requestBody[column] !== undefined &&
      requestBody[column] !== null &&
      requestBody[column] !== "" && // Exclude empty strings
      !(
        model.rawAttributes[column].allowNull === false && !requestBody[column]
      ) && // Check if required field is missing
      !model.rawAttributes[column].primaryKey &&
      !model.rawAttributes[column].autoIncrement
    );
  });
  const placeholders = Array.from(
    { length: filteredColumns.length },
    () => `?`
  ).join(", ");
  const columnNames = filteredColumns.join(", ");
  const query = `INSERT INTO ${model.tableName}(${columnNames}) VALUES (${placeholders})`;
  const values = filteredColumns.map((column) => {
    const attributeType = model.rawAttributes[column].type;
    if (
      (attributeType instanceof DataTypes.JSON ||
        attributeType instanceof DataTypes.TEXT) &&
      (typeof requestBody[column] === "object" ||
        Array.isArray(requestBody[column]))
    ) {
      return JSON.stringify(requestBody[column]);
    }
    return requestBody[column];
  });
  return {
    query: query,
    values: values,
  };
};
/**Function to make query builder for update*/
export const updateQueryBuilder = (model, requestBody, customWhere = null) => {
  if (!model) {
    throw new Error("Model is undefined or null.");
  }
  requestBody = JSON.parse(JSON.stringify(requestBody));
  const columns = Object.keys(model.rawAttributes);
  // Identify primary keys and auto increment keys
  const primaryKeyColumns = columns.filter(
    (column) =>
      model.rawAttributes[column].primaryKey ||
      model.rawAttributes[column].autoIncrement
  );
  // Filter columns to update, excluding primary keys, auto increment keys, and the 'created_by' column
  const filteredColumns = columns.filter((column) => {
    return (
      column !== "created_by" && // Exclude the 'created_by' column
      requestBody.hasOwnProperty(column) &&
      requestBody[column] !== undefined &&
      // requestBody[column] !== null &&
      requestBody[column] !== "" &&
      !model.rawAttributes[column].primaryKey &&
      !model.rawAttributes[column].autoIncrement
    );
  });
  // Generate SET part of the update query
  const setStatements = filteredColumns
    .map((column) => `${column} = ?`)
    .join(", ");
  // Determine columns for the WHERE part of the update query
  const whereColumns =
    customWhere && Object.keys(customWhere).length > 0
      ? Object.keys(customWhere)
      : primaryKeyColumns;
  const whereClauses = whereColumns
    .filter((column) => model.rawAttributes[column])
    .map((column) => `${column} = ?`);
  if (whereClauses.length === 0) {
    throw new Error("No columns provided for the WHERE clause.");
  }
  const whereClause = whereClauses.join(" AND ");
  const query = `UPDATE ${model.tableName} SET ${setStatements} WHERE ${whereClause}`;
  const values = filteredColumns.map((column) => {
    const attributeType = model.rawAttributes[column].type;
    if (
      (attributeType instanceof DataTypes.JSON ||
        attributeType instanceof DataTypes.TEXT) &&
      (typeof requestBody[column] === "object" ||
        Array.isArray(requestBody[column]))
    ) {
      return JSON.stringify(requestBody[column]);
    }
    return requestBody[column];
  });
  // Append WHERE clause values to the values array
  if (customWhere) {
    whereColumns.forEach((column) => {
      //   if (customWhere.hasOwnProperty(column)) {
      values.push(customWhere[column]);
      //   }
    });
  } else {
    primaryKeyColumns.forEach((column) => {
      if (requestBody.hasOwnProperty(column)) {
        values.push(requestBody[column]);
      }
    });
  }
  return {
    query: query,
    values: values,
  };
};

/**Function to upload file */
export const uploadFile = async (folder, file) => {
  file = Array.isArray(file) ? file : [file];
  return Promise.all(
    file.map(async (file) => {
      const fileName = `${Date.now()}_${file.name}`;
      await file.mv(path.join(__dirname, `../public/${folder}/`, fileName));
      return `'${folder}/${fileName}'`;
    })
  );
};
/**Function to delete file from folder */

export const deleteFile = async (fileName) => {
  const oldImagePath = path.join(__dirname, "..", "public", fileName);

  // Ensure the path is properly escaped
  const oldImagePathEscaped = oldImagePath.replace(/\\/g, "/");
  const cleanedPath = oldImagePathEscaped.replace(/'/g, "");
  const normalizedPath = path.normalize(cleanedPath);

  if (fs.existsSync(normalizedPath)) {
    fs.unlinkSync(normalizedPath);
  } else {
    console.log("File does not exist at the path:", normalizedPath);
  }
};

/**Function for error return message */
export const sendSuccessResponse = (
  res,
  statusCode,
  message = "",
  data = [],
  totalCount = null
) => {
  return res.status(statusCode).json({
    status: true,
    message: message,
    data,
    totalCount,
  });
};
/**Function for error return message */
export const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: false,
    message: message,
  });
};

/**Where condition check*/
export const whereCondition = async (request) => {
  const filterString = request.filter || "";
  const columnName = request.columnName || "id";
  const start =
    request.grouped === "true"
      ? `AND ${request.table}.id IN (SELECT MAX (id) FROM ${request.table} WHERE deleted = 0 GROUP BY name)`
      : "";
  let filter = {};
  if (typeof filterString === "string" && filterString.trim() !== "") {
    filter = JSON.parse(filterString);
  }
  const page = parseInt(request.page) || 1;
  const pageSize = parseInt(request.pageSize) || 10;
  const offset = (page - 1) * pageSize;
  const where =
    start +
    (request.id ? `AND ${request.table}.${columnName} = ${request.id}` : "");
  let accessType = "";
  /** access type filter */
  let whereFilter = "";
  let whereFilterRecord = Object.entries(filter)
    .filter(([key, value]) => value !== "") // Remove entries with empty values
    .map(([key, value]) => `${request.table}.${key} = '${value}'`)
    .join(" AND ");
  if (whereFilterRecord !== "") {
    whereFilter = `AND ${whereFilterRecord}`;
  }
  const pagination =
    request.showAll === "false" ? `LIMIT ${pageSize} OFFSET ${offset}` : "";
  const returnQuery = `${accessType} ${where} ${whereFilter} ORDER BY ${request.table}.id DESC ${pagination}`;
  return returnQuery;
};

export const makeTotalCountQuery = (Query) => {
  const totalCountQuery = Query.substring(0, Query.indexOf("ORDER BY"));
  return totalCountQuery;
};

/**
 * @param {string} table :- table name
 * @param {string} field :- column name
 * @param {string} value :- column value
 *# Function to get record from table
 */
export const getRecord = async (table, field, value) => {
  if (!table || !field || !value) {
    throw new Error("Table, field or value is undefined or null");
  }
  const getQuery = `SELECT * FROM ${table} WHERE ${field} = '${value}' AND deleted = 0`;
  const record = await db.query(getQuery);
  return record;
};
