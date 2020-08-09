import { Command } from './command';
export const Ping = new Command("\!\sping|!ping\g")

Ping.processCommand = async (message) => {
    message.reply('Pong!');
}