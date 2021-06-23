import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';

const port = 3333;
const app = express();

// permite que qualquer domínio possa acessar a api
app.use(cors());

// exemplo de uso do Cors em produção para proteger a api
// app.use(cors({
//     origin: ['dominio.com.br']
// }));

// configura o recebimento das requisições em forma de json
app.use(express.json());

// disponibiliza as rotas para o uso na aplicação
app.use(routes);

// disponibiliza uma rota com o conteúdo estático para o usuário poder baixar
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// possibilita que a api retorne os erros que o celebrate retorna nas validações
app.use(errors());

app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port} 🔥`);
});