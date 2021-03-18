import app from '../app';

const port = 4000;

const handle_listening = () => {
    console.log(`Listening on: http://localhost:${port}`);
}

app.listen(port, handle_listening);