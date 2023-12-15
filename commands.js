import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'chest',
    description: 'Opens a mysterious chest filled with random goodies!',
    type: 1
  },
  {
    name: 'think',
    description: 'She thinks.',
    type: 1
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}