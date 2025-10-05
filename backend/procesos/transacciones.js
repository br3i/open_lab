const { Pool } = require('pg');
const CONFIGCENTRALIZADA = require('./../config/databaseCentral');

// Define la base de datos para este archivo
const DATABASE_NAME = 'railway';

// Inicializa el pool para la base de datos definida
const pool = new Pool({ ...CONFIGCENTRALIZADA, database: DATABASE_NAME });

const iniciarTransaccion = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        return client;
    } catch (error) {
        client.release();
        throw error;
    }
};

const commitTransaccion = async (client) => {
    try {
        await client.query('COMMIT');
    } finally {
        client.release();
    }
};

const rollbackTransaccion = async (client) => {
    try {
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
};

module.exports = { iniciarTransaccion, commitTransaccion, rollbackTransaccion, pool };
