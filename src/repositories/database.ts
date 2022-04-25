import  sqlite3  from "sqlite3";
const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
    CREATE TABLE tb_item (
    id          INTEGER      PRIMARY KEY,
    name        VARCHAR (30),
    description VARCHAR (30),
    quantity    INTEGER
);`

    const database = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
            console.error(err.message)
            throw err
        } else {
            console.log('Base de dados conectada com sucesso.')
            database.run(SQL_ITENS_CREATE, (err) => {
                if (err) {
                    // Possivelmente a tabela já foi criada
                } else {
                    console.log('Tabela itens criada com sucesso.')
                }
            })
        }
    })
    export default database