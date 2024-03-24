import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import config from  './config/db.js'
import userRoutes from  './routes/userRoutes.js'
import projectRoutes from  './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import invoiceRoutes from './routes/invoiceRoutes.js';
import clientRoutes from './routes/clientRoutes.js'
import fileRoutes from './routes/projectFileRoutes.js'

const PORT = 8080;
const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

config.connect();  // DB connection done here

app.get("/api", (req, res) => {
    res.json({ message: "hello5 world" })
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})


app.use('/api/v1', userRoutes);
app.use('/api/v1', projectRoutes)
app.use('/api/v1', taskRoutes);
app.use('/api/v1', invoiceRoutes);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', fileRoutes)