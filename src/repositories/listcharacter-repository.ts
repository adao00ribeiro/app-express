
import ListCharacter from '../models/listcharacter'
import database from './database'

const listCharacterRepository = {
    criar: (item: ListCharacter, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO tb_itens (nome, descricao) VALUES (?, ?)'
        const params = [item.user_id, item.character_id]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (itens: ListCharacter[]) => void) => {
        const sql = 'SELECT * FROM tb_itens'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (item?: ListCharacter) => void) => {
        const sql = 'SELECT * FROM tb_itens WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, item: ListCharacter, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE tb_itens SET nome = ?, descricao = ? WHERE id = ?'
        const params = [item.user_id, item.character_id, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM tb_itens WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default listCharacterRepository