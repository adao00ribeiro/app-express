import User from '../models/user'
import database from './database'

const userRepository = {
    criar: (user: User, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO tb_user (name,password) VALUES (?, ?)';
        const params = [user.name , user.password];
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (itens: User[]) => void) => {
        const sql = 'SELECT * FROM tb_user'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (username: string ,password: string, callback: (item?: User) => void) => {
        const sql = 'SELECT * FROM tb_user WHERE email = ? and password = ?'
        const params = [username,password]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, item: User, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE tb_user SET nome = ?, descricao = ? WHERE id = ?'
        const params = [item.name, item.password, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM tb_user WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default userRepository