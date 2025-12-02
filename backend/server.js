const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws";
const maxAge = 60 * 60;

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

app.post('/auth/signup', async(req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length !== 0) return res.status(409).json({ error: "User already registered" });

        const salt = await bcrypt.genSalt();  
        const bcryptPassword = await bcrypt.hash(password, salt)
        const authUser = await pool.query( 
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); 

        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        res.status(400).send(err.message);
    }
});


app.get('/auth/authenticate', async(req, res) => {
    const token = req.cookies.jwt; 

    let authenticated = false;
    try {
        if (token) { 
            await jwt.verify(token, secret, (err) => { 
                if (err) { 
                    res.send({ "authenticated": authenticated }); 
                } else { 
                    authenticated = true;
                    res.send({ "authenticated": authenticated });
                }
            })
        } else { 
            res.send({ "authenticated": authenticated }); 
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
app.get('/auth/logout', (req, res) => {
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

app.get('/posts', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, content, date FROM posts ORDER BY date DESC'
      );
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

app.post('/posts', async (req, res) => {
    try {
      const { content } = req.body;
  
      if (!content || content.trim() === "") {
        return res.status(400).json({ error: "Content is required" });
      }
  
      const result = await pool.query(
        "INSERT INTO posts (content) VALUES ($1) RETURNING id, content, date",
        [content]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to create post" });
    }
});

app.delete('/posts', async (req, res) => {
    try {
      await pool.query("DELETE FROM posts");
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete posts" });
    }
});