import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import * as fs from 'fs';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const responses = JSON.parse(fs.readFileSync("chestresponses.json"));

let responsesTotalWeight = 0;

for(const response of responses) {
  responsesTotalWeight+=response.weight;
}

client.on('ready', () => {
  console.log('Logged in as ${client.user.tag}!');
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'chest') {
      await chest(interaction);
    }
    if (interaction.commandName === 'think') {
      await think(interaction);
    }
  }
});

async function think(interaction) {
    return interaction.deferReply();
}

async function chest(interaction) {
  await interaction.reply('Opening chest...');

  await sleep(1000);

  let selectedWeight = Math.random() * responsesTotalWeight;
  let selectedResponse;

  for(const response of responses) {
    selectedWeight -= response.weight;
    if(selectedWeight < 0) {
      selectedResponse = response;
      break;
    }
  }

  await interaction.channel.send('You found ' + selectedResponse.item + '!');
}

client.login(process.env.DISCORD_TOKEN);