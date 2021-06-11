import { Router } from 'express';
import knex from '../database/connection';

const itemsRouter = Router();

itemsRouter.get('/', async (request, response) => {
    const items = await knex('items').select('*'); // ==> select de todos os itens da tabela

    const serializedItems = items.map(item => { // ==> serialize é quando pegamos a informação do banco e modificamos ela antes de enviar para o usuário final
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });

    return response.json(serializedItems);
});

export default itemsRouter;