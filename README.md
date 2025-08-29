# Discord Apple Music Rich Presence 🎵

> I created this app to share my Apple Music listening activity on Discord! Feel free to use it for your own Discord profile.

**Created by:** Dhanush Amirineni  
**Purpose:** Display your Apple Music listening activity as Discord Rich Presence status  
**Platform:** macOS only (uses native Apple Music integration)

## Why I Built This

I wanted my Discord friends to see what I'm listening to on Apple Music, just like Spotify users can. So I built this lightweight app that runs in the background and updates your Discord status with your current Apple Music track!

## Want to Use This?

Feel free to clone this repo and set it up for yourself! Instructions below 👇

## Features

- 🎵 Shows currently playing song, artist, and album
- ⏱️ Displays playback progress with time remaining
- ⏸️ Shows paused state
- 🔄 Updates every 5 seconds
- 🍎 Native Apple Music integration using AppleScript

## Prerequisites

- macOS (required for Apple Music integration)
- Node.js (v14 or higher)
- Discord desktop app
- Apple Music app (formerly iTunes)

## Setup Instructions

### Step 1: Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give your app a name (e.g., "Apple Music Presence")
4. Go to the "General Information" tab
5. Copy the **Application ID** (Client ID)
6. (Optional) Go to "Rich Presence" → "Art Assets" and upload images:
   - Upload an image named `apple_music` for the large icon
   - Upload images named `playing` and `paused` for small icons

### Step 2: Configure the Application

1. Open `index.js` in a text editor
2. Replace `CLIENT_ID` value with your Discord Application ID:
   ```javascript
   const CLIENT_ID = 'YOUR_APPLICATION_ID_HERE';
   ```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run the Application

```bash
npm start
```

Or run directly with Node:

```bash
node index.js
```

## Usage

1. Make sure Discord is running
2. Open Apple Music and play a song
3. Start the application
4. Your Discord status will now show what you're listening to!

## Running in Background

### Option 1: Using PM2 (Recommended)

Install PM2 globally:
```bash
npm install -g pm2
```

Start the app:
```bash
pm2 start index.js --name "apple-music-discord"
```

Other PM2 commands:
```bash
pm2 stop apple-music-discord    # Stop the app
pm2 restart apple-music-discord  # Restart the app
pm2 logs apple-music-discord     # View logs
pm2 delete apple-music-discord   # Remove from PM2
```

### Option 2: Using nohup

```bash
nohup node index.js > output.log 2>&1 &
```

To stop:
```bash
# Find the process ID
ps aux | grep "node index.js"
# Kill the process
kill [PID]
```

### Option 3: Create a Launch Agent (macOS)

Create a plist file at `~/Library/LaunchAgents/com.discord.apple-music.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.discord.apple-music</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>/Users/dhanushamirineni/Developer/projects/discord-apple-music-presence/index.js</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/discord-apple-music.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/discord-apple-music.error.log</string>
</dict>
</plist>
```

Load the launch agent:
```bash
launchctl load ~/Library/LaunchAgents/com.discord.apple-music.plist
```

## Customization

### Change Update Interval

In `index.js`, modify the `UPDATE_INTERVAL` constant:
```javascript
const UPDATE_INTERVAL = 5000; // milliseconds
```

### Modify Display Format

Edit the presence object in the `updatePresence()` function to customize what's shown.

## Troubleshooting

### "Failed to connect to Discord"
- Make sure Discord desktop app is running
- Verify you've replaced the CLIENT_ID with your actual Discord App ID
- Check that Discord Rich Presence is enabled in Discord settings

### "Error getting Apple Music info"
- Ensure Apple Music (Music app) is installed
- Grant Terminal/Terminal app permission to control Apple Music in System Preferences → Security & Privacy → Privacy → Automation

### No status showing
- Check that a song is actually playing in Apple Music
- Look at the console output for any error messages
- Try restarting both Discord and the script

## Privacy & Security

- This app only reads your currently playing track information
- No data is sent anywhere except to Discord for presence updates
- All processing happens locally on your machine

## License

MIT
