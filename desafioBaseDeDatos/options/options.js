export const mariaDB = {
    client: 'mysql',
    connection: {
        host: 'localhost', //127.0.0.1
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}

export const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite3'
    },
    useNullAsDefault: true
}