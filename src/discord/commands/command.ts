export class Command {
    matcher: string;

    constructor(matcher: string) {
        this.matcher = matcher;
    }

    async processCommand(message) {
        message.reply(`I'm sorry, I don't recognize this command.`);
    }
}