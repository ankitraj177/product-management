import mysql from "mysql";
import util from "util";

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "product_management",
};

// Create a connection to the database
export const con = mysql.createConnection(config);

export const makeDb = () => {
    const connection = mysql.createConnection(config);

    return {
        query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        },
    };
};

// Connect to the database
con.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
    }
    console.log("Connected to the database as id", con.threadId);
});

const db = makeDb();
export default db