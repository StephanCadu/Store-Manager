const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
