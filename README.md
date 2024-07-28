# User Emoji Bot
Use this bot to add and view custom emojis from a user app.

## Discord Bot Setup
1. Go to your Discord Developer Dashboard
2. Create a new bot and name it whatever you'd like.
3. Go to "Installation" and make sure User Install is selected.
4. Make sure you use a discord provided link and have the applications.command selected.

## Code Setup
1. Rename `config.example.json` to `config.json`
2. Fill in the blanks in `config.json`
3. Use `npm i` to install the dependencies.
4. Use `node .` to run the bot.

## How to use
1. You can use `/add-emoji` to upload emojis through the bot or you can use the discord dashboard.
2. You can use `/view-emojis` to view a list of available emojis.
3. You can use `/send-emoji` to send an emoji by name.

## Important Notes
This is a barebones project designed for you to build on. There is nearly no error handling, and `/view-emojis` may become troublesome as you add more emojis. You can delete emojis in the Discord Developer Dashboard.