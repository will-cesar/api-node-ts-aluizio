import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const port = 3333;

app.use(express.json());

app.use(routes);

// disponibiliza uma rota com o conteúdo estático para o usuário poder baixar
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port} 🔥`);
});