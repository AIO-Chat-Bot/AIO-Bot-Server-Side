var io = require('socket.io')()
var count = 0
const { Client, Collection } = require('discord.js')
const client = new Client({
    intents: ["GUILDS", "GUILDS","GUILD_MEMBERS","GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"]
});
const { GithubStats } = require('github-release-stats');
const gh = new GithubStats('AIO-Chat-Bot', 'AIO-Bot');

io.on('connection', function(socket) {
    count++;
    socket.emit('message', { info: '**You are connected to AIO Bot network!**\nFeel free to join our discord: https://discord.gg/nBhNgfNKmU' });
    socket.on('disconnect', function(){
        count--;
    })
});

client.on("ready", () => {
    const guild = client.guilds.cache.get('1050524479341727805');
    setInterval(() => {

        gh.getTotalDownloads().then(count2 => {
            const channel = guild.channels.cache.get('1050525442915979264')
            channel.setName(`Total Downloads: `+count2)
          }).catch(error => {
            console.error(error.message);
          });

        const channel = guild.channels.cache.get('1050525535060631672')
        channel.setName(`Online Bots: `+count)
    }, 120000);
});

io.listen(7777);
client.login('BOT_TOKEN');