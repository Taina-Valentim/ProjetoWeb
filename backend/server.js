require("dotenv").config(); // carrega o arquivo .env
const app = require('./app'); // Importa a configuração do app

const PORT = process.env.PORT || 8081; // Define a porta
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
