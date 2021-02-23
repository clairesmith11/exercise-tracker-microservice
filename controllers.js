const { User, Exercise } = require('./models');
const moment = require('moment');

const newUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const user = await User.create({ username });
        res.send({
            username: user.username,
            _id: user._id
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select({ __v: 0 });

        res.send(users);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

const newExercise = async (req, res, next) => {
    let { userId, duration, description, date } = req.body;
    try {
        const user = await User.findOne({ _id: userId });

        if (!user) throw new Error('No user with that ID');

        Exercise.create({
            description,
            duration,
            date: date ? new Date(date).valueOf() : new Date().valueOf(),
            userId: user._id
        });

        res.send({
            _id: userId,
            username: user.username,
            date: new Date(date).toDateString(),
            duration: +duration,
            description


        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }

};

const getUserExercises = async (req, res, next) => {
    try {
        let { userId, from, to, limit } = req.query;
        from = from ? new Date(from).valueOf() : new Date(0).valueOf();
        to = to ? (new Date(to).valueOf() + 86400000) : new Date().valueOf();
        limit = limit ? +limit : 1000;

        const user = await User.findOne({ _id: userId });
        if (!user) throw new Error('No user with that ID');

        const userExercises = await Exercise.find({
            userId: userId,
            date: {
                $gte: from,
                $lte: to
            }
        }).limit(limit);

        res.send({
            _id: user._id,
            username: user.username,
            count: userExercises.length,
            log: userExercises.map(ex => {
                let d = new Date(+ex.date);
                return {
                    description: ex.description,
                    duration: ex.duration,
                    date: d.toDateString()
                };
            })
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

exports.newUser = newUser;
exports.getAllUsers = getAllUsers;
exports.newExercise = newExercise;
exports.getUserExercises = getUserExercises;