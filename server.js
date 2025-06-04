const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (email === "usuario@teste.com" && senha === "123456") {
    res.send("<h1>Bem-vindo ao dashboard</h1>");
  } else {
    res.redirect("/login?erro=1");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
