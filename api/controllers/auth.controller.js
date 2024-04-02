const { User } = require('../models/user.model');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        password === ''
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        //Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }
    } catch {
        res.status(400).json({ errors: [{ msg: 'error' }] });
    }

    const newUser = new User({
        username,
        email,
        password,
    });

    await newUser.save();
    res.send('signuped');
};
