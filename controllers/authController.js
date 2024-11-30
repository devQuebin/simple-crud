const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

const login = (req, res) => {
  const { username, password } = req.body;
  if (username === "test_user" && password === "hola123") {
    const token = jwt.sign({ user: username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

module.exports = { login };
