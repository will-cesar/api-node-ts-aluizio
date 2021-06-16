import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const port = 3333;
const app = express();

app.use(cors()); // permite que qualquer domínio possa acessar a api

// exemplo de uso do Cors em produção para proteger a api
// app.use(cors({
//     origin: ['dominio.com.br']
// }));

app.use(express.json());

app.use(routes);

// disponibiliza uma rota com o conteúdo estático para o usuário poder baixar
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port} 🔥`);
});