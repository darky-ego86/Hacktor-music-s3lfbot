const { Client } = require('discord.js-selfbot-v13');
const { Kazagumo } = require('kazagumo');
const { Connectors } = require('@kazagumo/express');
const config = require('./config.json');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  checkUpdate: false
});

const kazagumo = new Kazagumo({
  plugins: [
    new Connectors.DiscordJS(client)
  ],
  defaultSearchEngine: 'youtube'
}, {
  moveOnDisconnect: false,
  resume: false,
  reconnectTries: 2,
  reconnectInterval: 5000
}, config.nodes);

client.on('ready', async () => {
  console.log(`Hacktor Music Selfbot is ready as ${client.user.tag}`);
  console.log('Developed by Darky');
  
  // Set initial activity
  client.user.setActivity('Hacktor Music', { type: 'WATCHING' });
  
  kazagumo.shoukaku.on('ready', () => console.log('Lavalink connected'));
});

client.on('messageCreate', async (message) => {
  if (message.author.id !== client.user.id) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'play':
      if (!args[0]) return message.reply('Please provide a song name or URL');
      await playCommand(message, args.join(' '));
      break;

    case 'skip':
      await skipCommand(message);
      break;

    case 'stop':
      await stopCommand(message);
      break;

    case 'queue':
      await queueCommand(message);
      break;

    case 'nowplaying':
      await nowPlayingCommand(message);
      break;

    case 'volume':
      await volumeCommand(message, args[0]);
      break;

    case 'pause':
      await pauseCommand(message);
      break;

    case 'resume':
      await resumeCommand(message);
      break;

    case 'leave':
      await leaveCommand(message);
      break;

    case 'watch':
      await setActivity(message, args.join(' '), 'WATCHING');
      break;

    case 'play':
      await setActivity(message, args.join(' '), 'PLAYING');
      break;

    case 'listen':
      await setActivity(message, args.join(' '), 'LISTENING');
      break;

    case 'stream':
      await setActivity(message, args.join(' '), 'STREAMING');
      break;

    case 'compete':
      await setActivity(message, args.join(' '), 'COMPETING');
      break;

    case 'clearactivity':
      await clearActivity(message);
      break;
  }
});

async function playCommand(message, query) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) return message.reply('You need to be in a voice channel');

  const player = kazagumo.players.get(message.guild.id);
  if (!player) {
    await kazagumo.createPlayer({
      guildId: message.guild.id,
      voiceId: voiceChannel.id,
      textId: message.channel.id,
      deaf: true
    });
  }

  const result = await kazagumo.search(query, { requester: message.author });
  if (!result.tracks.length) return message.reply('No results found');

  const player = kazagumo.players.get(message.guild.id);
  if (result.type === 'PLAYLIST') {
    player.queue.add(result.tracks);
    message.reply(`Added ${result.tracks.length} tracks from playlist`);
  } else {
    player.queue.add(result.tracks[0]);
    message.reply(`Added ${result.tracks[0].title} to queue`);
  }

  if (!player.playing && !player.paused) {
    await player.play();
  }
}

async function skipCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player) return message.reply('No player available');
  await player.skip();
  message.reply('Skipped current track');
}

async function stopCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player) return message.reply('No player available');
  await player.stop();
  message.reply('Stopped playback');
}

async function queueCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player || !player.queue.length) return message.reply('Queue is empty');
  
  const queue = player.queue.map((track, i) => `${i + 1}. ${track.title}`).join('\n');
  message.reply(`\`\`\`${queue}\`\`\``);
}

async function nowPlayingCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player) return message.reply('No player available');
  
  const track = player.queue.current;
  const position = player.position;
  const duration = track.length;
  
  message.reply(`Now playing: ${track.title}\n[${formatTime(position)}/${formatTime(duration)}]`);
}

async function volumeCommand(message, volume) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player) return message.reply('No player available');
  
  const vol = parseInt(volume);
  if (isNaN(vol) || vol < 0 || vol > 100) return message.reply('Volume must be between 0 and 100');
  
  await player.setVolume(vol);
  message.reply(`Volume set to ${vol}%`);
}

async function pauseCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player) return message.reply('No player available');
  await player.pause(true);
  message.reply('Paused playback');
}

async function resumeCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (!player) return message.reply('No player available');
  await player.pause(false);
  message.reply('Resumed playback');
}

async function leaveCommand(message) {
  const player = kazagumo.players.get(message.guild.id);
  if (player) await player.destroy();
  message.reply('Left voice channel');
}

async function setActivity(message, activityText, activityType) {
  if (!activityText) return message.reply('Please provide activity text');
  
  const activityTypes = {
    'WATCHING': 'WATCHING',
    'PLAYING': 'PLAYING',
    'LISTENING': 'LISTENING',
    'STREAMING': 'STREAMING',
    'COMPETING': 'COMPETING'
  };

  if (!activityTypes[activityType]) {
    return message.reply('Invalid activity type. Use: watch, play, listen, stream, compete');
  }

  try {
    await client.user.setActivity(activityText, { type: activityTypes[activityType] });
    message.reply(`Activity set to: ${activityType} ${activityText}`);
  } catch (error) {
    message.reply('Failed to set activity: ' + error.message);
  }
}

async function clearActivity(message) {
  try {
    await client.user.setActivity(null);
    message.reply('Activity cleared');
  } catch (error) {
    message.reply('Failed to clear activity: ' + error.message);
  }
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}:${minutes % 60}:${seconds % 60}`;
  }
  return `${minutes}:${seconds % 60}`;
}

kazagumo.shoukaku.on('error', (error, node) => {
  console.error(`Lavalink node ${node.name} error:`, error);
});

client.login(process.env.DISCORD_TOKEN);
