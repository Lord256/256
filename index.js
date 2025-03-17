const venom = require('venom-bot');
const path = require('path');

// Definindo o caminho da pasta de sessão
const sessionFolder = path.join(__dirname, 'my-sessions');

// Definindo o caminho para o Chromium no Heroku
const chromePath = process.env.CHROME_BIN || "/usr/bin/google-chrome-stable"; // Caminho padrão do Chromium no Heroku

venom
  .create('session-name', undefined, undefined, {
    folderName: sessionFolder,
    executablePath: chromePath,
    headless: true, // Modo headless
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--headless',
      '--disable-gpu',
      '--window-size=1920x1080',
    ],
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    // Saudação do cliente
    const saudacoes = ['oi', 'oi', 'Olá', 'Ola', 'ola', 'olá', 'Rafael', 'Rafa', 'Paulo', 'Bom dia', 'Boa tarde', 'Boa noite'];
    if (saudacoes.includes(message.body.trim())) {
      client.sendText(message.from,
        "Seja bem-vindo! Sou o assistente virtual 🤖 do Rafael, consultor da Editora Lion. Escolha uma das opções abaixo para seguir o atendimento:\n\n" +
        "1️⃣ Ver catálogo\n" +
        "2️⃣ Falar com Rafael\n" +
        "Digite o número da opção desejada."
      );
    } else if (message.body.toLowerCase() === 'menu') {
      client.sendText(message.from,
        "Seja bem-vindo! Sou o assistente virtual 🤖 do Rafael, consultor da Editora Lion. Escolha uma das opções abaixo para seguir o atendimento:\n\n" +
        "1️⃣ Ver catálogo\n" +
        "2️⃣ Falar com Rafael\n" +
        "Digite o número da opção desejada."
      );
    } else if (message.body === '1') {
      // Enviando o catálogo
      client.sendText(message.from, "📚 Aqui está nosso catálogo: https://drive.google.com/drive/folders/1NYXeo1LEXhXY8WwCnacV99H73AIQhH_4")
        .then(() => {
          client.sendText(message.from, "Você pode fazer seu pedido diretamente através deste link: https://docs.google.com/spreadsheets/d/1HSyCu_NXYo6i6ssYVXu0IlKprF1fHPj1/edit?gid=787904471#gid=787904471");
        });
    } else if (message.body === '2') {
      client.sendText(message.from, "👨‍💻 O Rafael entrará em contato em breve!");
    } else {
      client.sendText(message.from, "Não entendi. Digite 'menu' para ver as opções.");
    }
  });
}