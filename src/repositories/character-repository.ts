import Character from '../models/character'
import database from './database'

const characterRepository = {
    criar: (inventory: Character, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO tb_inventory (nome, descricao) VALUES (?, ?)'
        const params = [inventory.id, inventory.idjogador]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (itens: Character[]) => void) => {
        const sql = 'SELECT * from tb_inventory_global'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (itens: Character[]) => void) => {
        const sql = 'SELECT * from tb_inventory_global where tb_inventory_global.player_id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, inventory: Character, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE tb_inventory SET nome = ?, descricao = ? WHERE id = ?'
        const params = [inventory.id, inventory.idjogador]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM tb_inventory WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default characterRepository