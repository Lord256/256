const venom = require('venom-bot');

venom
  .create({
    session: 'botlion',
    headless: true,  // Necessário para servidores como Railway
    useChrome: false,  // Usa Chromium ao invés de Chrome
    disableSpins: true,
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-component-extensions-with-background-pages',
      '--disable-features=TranslateUI,BlinkGenPropertyTrees',
      '--disable-ipc-flooding-protection',
      '--disable-renderer-backgrounding',
      '--enable-features=NetworkService,NetworkServiceInProcess',
      '--force-color-profile=srgb',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--enable-automation'
    ]
  })
  .then((client) => {
    start(client);
    console.log('Bot iniciado com sucesso!');
  })
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'];
    
    if (saudacoes.includes(message.body.toLowerCase().trim())) {
      client.sendText(message.from,
        "Seja bem-vindo! Sou o assistente virtual 🤖 do Rafael, consultor da Editora Lion. Escolha uma das opções abaixo:\n\n" +
        "1️⃣ Ver catálogo\n" +
        "2️⃣ Falar com Rafael\n" +
        "Digite o número da opção desejada."
      );
    } else if (message.body === '1') {
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