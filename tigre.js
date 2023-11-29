app.listen(process.env.PORT || 3000)
const TelegramBot = require('node-telegram-bot-api');

// Substitua 'SEU_TOKEN' pelo token real do seu bot
const token = '6739461313:AAEpZzJ7xb6lFdmTCMFtiFQGdKPjgsb6Q3M';
const bot = new TelegramBot(token, { polling: false });

// Substitua 'ID_DO_CANAL' pelo ID real do seu canal
const canalId = '-1002038734035';

function enviarSinal() {
    // Gere números aleatórios para jogadas, chance de acerto e adicione 2 minutos à hora atual para a validade
    const jogadasNormal = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
    const jogadasTurbo = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
    const chanceAcerto = (Math.random() * (99.7 - 96.56) + 96.56).toFixed(2);

    const horaAtual = new Date();
    const horaValidade = new Date(horaAtual.getTime() + 2 * 60000); // Adiciona 2 minutos à hora atual

    // Enviar mensagem de "Entrada Confirmada" com botão
    const entradaConfirmadaMensagem = `🟢 ENTRADA CONFIRMADA 🟢

🐯GBR Tiger🐅  

🐯 ${jogadasNormal}X normal
🐅 ${jogadasTurbo}X turbo
⏱ Valido até: ${horaValidade.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
📊 Chance de acerto: ${chanceAcerto}%
🔁 Nº de tentativas: 2`;

    const tecladoEntrada = {
        inline_keyboard: [
            [{ text: 'Plataforma aqui', url: 'https://brazilbet.win/yl21qdjso' }],
        ],
    };

    // Enviar mensagem "Hackeando Sinal"
    bot.sendMessage(canalId, '🐯 Hackeando Sinal, aguarde 🐯').then((hackeandoMsg) => {
        // Aguardar 5 segundos antes de apagar a mensagem
        setTimeout(() => {
            bot.deleteMessage(canalId, hackeandoMsg.message_id);
        }, 5000);

        // Aguardar 5 segundos antes de enviar a próxima mensagem
        setTimeout(() => {
            bot.sendMessage(canalId, entradaConfirmadaMensagem, { reply_markup: JSON.stringify(tecladoEntrada) }).then((entradaMsg) => {
                // Agendar a mudança para "Entrada Finalizada" após 2 minutos
                setTimeout(() => {
                    const entradaFinalizadaMensagem = entradaConfirmadaMensagem.replace(/🟢 ENTRADA CONFIRMADA 🟢/g, '🔴 ENTRADA FINALIZADA 🔴');
                    const tecladoFinalizada = {
                        inline_keyboard: [
                            [{ text: 'Plataforma aqui', url: 'https://brazilbet.win/yl21qdjso' }],
                        ],
                    };
                    bot.editMessageText(entradaFinalizadaMensagem, { chat_id: canalId, message_id: entradaMsg.message_id, reply_markup: JSON.stringify(tecladoFinalizada) }).then(() => {
                        // Agendar o envio da mensagem "Sinal acabou, aguarde o próximo" após 5 segundos
                        setTimeout(() => {
                            const sinalAcabouMensagem = 'Sinal acabou, aguarde o próximo\nCadastre-se na plataforma 👇🏼';
                            const tecladoSinalAcabou = {
                                inline_keyboard: [
                                    [{ text: 'Plataforma aqui', url: 'https://brazilbet.win/yl21qdjso' }],
                                ],
                            };
                            bot.sendMessage(canalId, sinalAcabouMensagem, { reply_markup: JSON.stringify(tecladoSinalAcabou) });
                        }, 1000); // tempo para enviar que acabou o sinal
                    });
                }, 120000); // 2 minutos
            });
        }, 5000); // 5 segundos
    });
}

// Iniciar o fluxo
enviarSinal();

// Repetir o fluxo a cada 2 minutos (tempo total para o ciclo)
setInterval(() => {
    enviarSinal();
}, 130000); // tempo para reiniciar
