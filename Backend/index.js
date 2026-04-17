import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const app = express()

app.use(cors({
    origin: [process.env.FRONTEND_LINK]
}))

app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    serverSelectionTimeoutMS: 30000,
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Games Schema
const gamesSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    questions: [{ type: String }]
});

const Games = mongoose.model('Games', gamesSchema, 'games');

//Base website route
app.get("/", (req, res)=>{
    res.send("Server is ready!");
})

app.get("/api/login", (req, res)=>{
    res.send("Server is ready!");
})

//Get function to fetch all games
app.get("/api/games", async (req, res)=>{
    try {
        const games = await Games.find({});
        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: "Error fetching games", error: error.message });
    }
})
//Post function for registration
app.post("/api/register", async (req, res)=>{
    try {
        const { username, password, repeatPassword } = req.body;
        
        // Validate input
        if (!username || !password || !repeatPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if passwords match
        if (password !== repeatPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        
        // Password requirement checks
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        }
        
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one lowercase letter" });
        }
        
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one number" });
        }
        
        if (!/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one special character (!@#$%^&*)" });
        }
        
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({ message: "User registered successfully"});
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
})

//Post function for logging in
app.post("/api/login", async (req, res)=>{
    try {
        const { username, password} = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if user exists in database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Username does not exist" });
        }
        
        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password does not match" });
        }
        
        // Login successful
        res.status(200).json({ message: "Login successful", user: { username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
})

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})