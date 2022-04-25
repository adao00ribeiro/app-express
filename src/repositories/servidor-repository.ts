import Servidor from '../models/Servidor'
import database from './database'

const servidorRepository = {
    criar: (item: Servidor, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO tb_servidores (nome, descricao) VALUES (?, ?)'
        const params = [item.name, item.ip]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (itens: Servidor[]) => void) => {
        const sql = 'SELECT * FROM tb_servidores'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (item?: Servidor) => void) => {
        const sql = 'SELECT * FROM tb_servidores WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, item: Servidor, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE tb_servidores SET nome = ?, descricao = ? WHERE id = ?'
        const params = [item.name, item.ip, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM tb_servidores WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default servidorRepository