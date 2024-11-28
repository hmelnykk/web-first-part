import express from 'express';
import cors from 'cors';
import { db } from './initDB.js'; // its a default js array

const app = express();

app.use(cors());
app.use(express.json())

app.get('/insects/', async (req, res) => {
    res.json(db);
});

app.get('/insects/:id', async (req, res) => {
    const { id } = req.params;
    res.json(db[id]);
});

app.post('/insects', async (req, res) => {
    const newInsect = req.body;
    const { id } = newInsect;

    const newInsectId = id ? id : db.length === 0 ? 0 : db[db.length - 1].id + 1;

    
    db.push({
        id: newInsectId,
        ...newInsect,
    })
    console.log(db);

    res.status(201);
})

app.put('/insects', async (req, res) => {
    const updatedInsect = req.body;
    const { id } = updatedInsect;

    if (db[id]) {
        db[id] = {
            ...db[id],
            ...updatedInsect,
        }

        res.status(201);
    }
});

app.delete('/insects/:id', async (req, res) => {
    const { id } = req.params;
    
    const idToDelete = db.findIndex(item => item.id === parseInt(id));

    if (idToDelete !== -1){
        db.splice(idToDelete, 1);
        res.status(201);
    }
})

app.listen(3001, () => {
    console.log('server has been started successfully');
});
