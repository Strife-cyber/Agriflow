import cors from 'cors';
import express from 'express';
import readline from 'readline';
import routes from './routes.js';
import bodyParser from 'body-parser';
import { syncDatabase } from './models/index.js';
import expressListEndpoints from 'express-list-endpoints';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());
app.use('/api', routes);

function listenForQuitCommand() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        if (input.trim().toLowerCase() === 'q') {
            console.log("Shutting down server...");
            process.exit(0); // Gracefully exit the server
        } else if (input.trim().toLowerCase() === 'c') {
            console.clear(); // Clear the console
        } else if (input.trim().toLowerCase() === 'l') {
            console.log(expressListEndpoints(routes))
        }
    });
}

app.listen(PORT, async () => {
    await syncDatabase();
    console.clear();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Press 'q' to quit the server.");
    listenForQuitCommand();
});
