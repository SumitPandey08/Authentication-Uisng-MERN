
import User from "../model/usermodels.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Detailed logging for debugging
    console.log("Request Body:", req.body); 
    console.log('Extracted Name:', name);
    console.log('Extracted Email:', email);
    console.log('Extracted Password:', password);

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Check if password is undefined here
        if (!password) {
            console.error("Password is not defined");
            return res.status(400).json({ errors: [{ msg: 'Password is required' }] });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

        console.log("User registered successfully:", user);

    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).send('Server error');
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log("Email:", email); // Log the email
    console.log("Password:", password); // Log the password

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.error("User not found");
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        console.log("User found:", user); // Log the user details

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Password does not match");
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).send('Server error');
    }
};



