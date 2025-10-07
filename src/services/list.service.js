import pool from "@/lib/db";

export const getList = async() =>{
    const result = await pool.query(
        "SELECT * FROM PRODUCTS;"
    );
    return result.rows;
}

export const postList = async(name, description, price, stock) =>{
    const result = await pool.query(
        "INSERT INTO PRODUCTS(NAME, DESCRIPTION, PRICE, STOCK) VALUES($1,$2,$3,$4);",
        [name, description, price, stock]
    );
    return result;
}
