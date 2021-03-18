import express from 'express';

const user_router = express.Router();

user_router.get('/',(req, res) => {
    res.send('User Index');
});

user_router.get('/edit',(req, res) => {
    res.send('User Edit');
})

user_router.get('/password',(req, res) => {
    res.send('User Password');
})

export default user_router;