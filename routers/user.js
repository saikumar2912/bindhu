const express = require('express');
const { create, update } = require('../model/User');

const router = express.Router();

const User = require('../model/User');

// * POST - add user
router.post('/', async(req, res) => {
    // console.log('Users route');
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        // TODO: add response
        res.status(500).send();
    }
});

// * GET - get users
router.get('/', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send({ error: 'Path not found' });
    }
});

router.get('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// * PATCH  => update user
router.patch('/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['name', 'password'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// * DELETE => delete user
router.delete('/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;