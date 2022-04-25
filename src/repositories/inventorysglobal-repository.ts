
import InventoryGlobal from '../models/InventoryGlobal'
import database from './database'

const inventoryGlobalRepository = {
    criar: (inventory: InventoryGlobal, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO tb_inventoryglobal (nome, descricao) VALUES (?, ?)'
        const params = [inventory.user_id, inventory.item_id]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
    lerTodos: (callback: (itens: InventoryGlobal[]) => void) => {
        const sql = 'SELECT * from tb_inventoryglobal'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => callback(rows))
    },
    ler: (id: number, callback: (itens: InventoryGlobal[]) => void) => {
        const sql = 'SELECT * from tb_inventoryglobal where tb_inventoryglobal.player_id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => callback(row))
    },
    atualizar: (id: number, inventory: InventoryGlobal, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE tb_inventoryglobal SET nome = ?, descricao = ? WHERE id = ?'
        const params = [inventory.user_id, inventory.item_id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM tb_inventoryglobal WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },
}
export default inventoryGlobalRepository