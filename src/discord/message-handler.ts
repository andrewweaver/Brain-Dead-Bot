import { Ping } from './commands/ping';
// ... Import new commands here

export const handleDiscordMessage = (message) => {
    if (message.content.startsWith('!'))
        evaluateCommand(message);
}

const evaluateCommand = (message) => {
    const messageContent = message.content;

    if (new RegExp(Ping.matcher).test(messageContent))
        Ping.processCommand(message);

    // ... Evaluate message content against the command's matchter regular expression

}