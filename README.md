
# Hacktor Music Selfbot

## ⚠️ EDUCATIONAL PURPOSES ONLY - USE AT YOUR OWN RISK

**This is a selfbot that violates Discord's Terms of Service. Using this bot can result in your account being permanently banned. This project is provided for educational purposes only to demonstrate Discord API capabilities. The developer is not responsible for any consequences that may occur from using this software.**

---

## 🎵 Features

- **Music Playback**: Full music system with Kazagumo client
- **Activity Control**: Custom status/activity commands
- **Owner-Only**: Restricted to your Discord account only
- **Queue Management**: Add, skip, stop, and view queue
- **Volume Control**: Adjustable volume levels
- **Playback Controls**: Pause, resume, and track information
- **Multiple Sources**: YouTube, Spotify, Jio Saavn, Deezer, SoundCloud, and more

---

## 📋 Requirements

- Node.js 16.0 or higher
- A Discord account (⚠️ **NOT a bot account**)
- Free Lavalink source (join our support server)
- Your Discord account token

---

## 🚀 Installation

1. **Clone or download this project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure your settings**:
   - Open `config.json` and replace:
     - `token`: Your Discord account token
     - `ownerId`: Your Discord user ID
     - `nodes`: Get from our support server (see below)
   - Create `.env` file with:
     ```
     DISCORD_TOKEN=your_account_token_here
     LAVALINK_PASSWORD=your_lavalink_password
     ```

4. **Start the bot**:
   ```bash
   node index.js
   ```

---

## 🎮 Commands

### Music Commands
- `.play <song/url>` - Play a song or add to queue
- `.skip` - Skip current track
- `.stop` - Stop playback and clear queue
- `.queue` - Show current queue
- `.nowplaying` - Show current track info
- `.volume <0-100>` - Set volume
- `.pause` - Pause playback
- `.resume` - Resume playback
- `.leave` - Leave voice channel

### Activity Commands
- `.watch <text>` - Set Watching activity
- `.play <text>` - Set Playing activity
- `.listen <text>` - Set Listening activity
- `.stream <text>` - Set Streaming activity
- `.compete <text>` - Set Competing activity
- `.clearactivity` - Clear your activity

---

## ⚙️ Configuration

### config.json Example
```json
{
  "token": "YOUR_ACCOUNT_TOKEN",
  "prefix": ".",
  "ownerId": "YOUR_DISCORD_USER_ID",
  "nodes": [
    {
      "name": "default",
      "url": "lavalink.example.com:2333",
      "auth": "yourlavalinkpassword",
      "secure": false
    }
  ]
}
```

---

## 🌟 Free Lavalink Sources

**Join our support server for FREE Lavalink sources with multiple music platforms:**

- 🎵 YouTube
- 🎧 Spotify
- 🎼 Jio Saavn
- 🎶 Deezer
- 🔊 SoundCloud
- And many more...

**Support Server Link**: [Join our Support Server](https://discord.gg/zenkai-headquarters-6-1363548442449674482)

Our support server provides:
- Free Lavalink nodes
- 24/7 uptime
- Multiple source support
- Instant setup
- Community support

---

## 🚨 Important Warnings

- **Account Ban Risk**: Selfbots are against Discord ToS
- **Token Security**: Never share your account token
- **Educational Only**: This is for learning purposes
- **No Responsibility**: Developer not liable for bans

---

## 💡 How to Get Your Discord Token

1. Open Discord in browser
2. Press `Ctrl+Shift+I` (DevTools)
3. Go to Application → Local Storage → discord.com
4. Find `token` value and copy it

---

## 📝 Legal Disclaimer

This software is provided "as is" for educational purposes only. The user assumes full responsibility for any consequences arising from the use of this software. The developer does not condone violating Discord's Terms of Service.

---

## 🤝 Credit

**Developer: Darky**

- Original concept and implementation
- Educational Discord API demonstration
- Selfbot architecture design

**You must give credit to the real developer - Darky. Removing or changing credits is strictly prohibited. This project was created by Darky and all rights belong to the original developer.**

---

## 📄 License

MIT License - Educational Use Only

---

**Remember: This is for educational purposes. Using selfbots risks permanent account termination. Proceed with caution and at your own risk.**

**Need help? Join our support server for free Lavalink sources and community support!**- `.leave` - Leave voice channel

### Activity Commands
- `.watch <text>` - Set Watching activity
- `.play <text>` - Set Playing activity
- `.listen <text>` - Set Listening activity
- `.stream <text>` - Set Streaming activity
- `.compete <text>` - Set Competing activity
- `.clearactivity` - Clear your activity

---

## ⚙️ Configuration

### config.json Example
```json
{
  "token": "YOUR_ACCOUNT_TOKEN",
  "prefix": ".",
  "ownerId": "YOUR_DISCORD_USER_ID",
  "nodes": [
    {
      "name": "default",
      "url": "lavalink.example.com:2333",
      "auth": "yourlavalinkpassword",
      "secure": false
    }
  ]
}
```

---

## 🔧 Lavalink Setup

You need a Lavalink server for music playback:

1. Download Lavalink from [official releases](https://github.com/lavalink-devs/Lavalink/releases)
2. Create `application.yml` configuration
3. Start the server with `java -jar Lavalink.jar`

---

## 🚨 Important Warnings

- **Account Ban Risk**: Selfbots are against Discord ToS
- **Token Security**: Never share your account token
- **Educational Only**: This is for learning purposes
- **No Responsibility**: Developer not liable for bans

---

## 💡 How to Get Your Discord Token

1. Open Discord in browser
2. Press `Ctrl+Shift+I` (DevTools)
3. Go to Application → Local Storage → discord.com
4. Find `token` value and copy it

---

## 📝 Legal Disclaimer

This software is provided "as is" for educational purposes only. The user assumes full responsibility for any consequences arising from the use of this software. The developer does not condone violating Discord's Terms of Service.

---

## 🤝 Credit

**Developer: Darky**

- Original concept and implementation
- Educational Discord API demonstration
- Selfbot architecture design

**You must give credit to the real developer - Darky. Removing or changing credits is strictly prohibited. This project was created by Darky and all rights belong to the original developer.**

---
