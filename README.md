````markdown
# Discord Apple Music Rich Presence

> Bridge the gap between Apple Music and Discord. Share your music taste with friends in real-time.

**Created by:** Dhanush Amirineni  
**Purpose:** Display your Apple Music listening activity as Discord Rich Presence status  
**Platform:** macOS only (uses native Apple Music integration)

## The Story Behind This Project

Ever felt left out when your Spotify-using friends could show off their music on Discord, but you couldn't do the same with Apple Music? I felt the same way. That's why I built this lightweight application that runs quietly in the background, bridging Apple Music with Discord's Rich Presence feature.

Now you can share your musical journey with friends, just like Spotify users have been doing all along.

## Ready to Get Started?

This project is open source and ready for you to use. Follow the setup guide below and you'll be sharing your Apple Music activity in minutes.

## What This App Does

- Shows currently playing song, artist, and album on your Discord profile
- Displays playback progress with accurate time remaining
- Indicates when music is paused
- Updates every 5 seconds for real-time accuracy
- Uses native Apple Music integration through AppleScript for reliability

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
2. Replace the `CLIENT_ID` value with your Discord Application ID:
   ```javascript
   const CLIENT_ID = "YOUR_APPLICATION_ID_HERE";
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

## How to Use

1. Make sure Discord is running on your computer
2. Open Apple Music and start playing a song
3. Launch the application using the commands above
4. Check your Discord profile - your music status should now be visible

## Background Operation

### Method 1: Using PM2 (Recommended for Developers)

PM2 is a process manager that keeps your app running even if it crashes.

Install PM2 globally:
```bash
npm install -g pm2
```

Start the app:
```bash
pm2 start index.js --name "apple-music-discord"
```

Useful PM2 commands:
```bash
pm2 stop apple-music-discord    # Stop the app
pm2 restart apple-music-discord  # Restart the app
pm2 logs apple-music-discord     # View logs
pm2 delete apple-music-discord   # Remove from PM2
```

### Method 2: Using nohup (Simple Background Process)

```bash
nohup node index.js > output.log 2>&1 &
```

To stop the process:
```bash
# Find the process ID
ps aux | grep "node index.js"
# Kill the process using the PID
kill [PID]
```

### Method 3: macOS Launch Agent (Auto-start on Login)

For advanced users who want the app to start automatically when they log in:

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
        <string>/path/to/your/project/index.js</string>
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

## Customization Options

### Adjust Update Frequency

Want faster or slower updates? Modify the `UPDATE_INTERVAL` in `index.js`:

```javascript
const UPDATE_INTERVAL = 5000; // Change this value (in milliseconds)
```

### Customize Display Format

You can modify what information appears on Discord by editing the presence object in the `updatePresence()` function.

## Troubleshooting Common Issues

### "Failed to connect to Discord"

This usually means one of these things:
- Discord desktop app isn't running
- The CLIENT_ID hasn't been replaced with your actual Discord App ID
- Discord Rich Presence is disabled in Discord settings

### "Error getting Apple Music info"

Check these potential solutions:
- Verify Apple Music (Music app) is installed and working
- Grant permission for Terminal to control Apple Music in System Preferences > Security & Privacy > Privacy > Automation
- Make sure a song is actually playing in Apple Music

### Discord status not showing

Try these debugging steps:
- Check the console output for error messages
- Restart both Discord and the application
- Verify that Rich Presence is enabled in your Discord settings
- Make sure you're using the Discord desktop app, not the web version

## Privacy and Data Handling

Your privacy matters. Here's what this application does and doesn't do:

**What it accesses:**
- Currently playing track information from Apple Music
- Basic playback state (playing, paused, stopped)

**What it doesn't do:**
- Store or save any of your music data
- Send information to any servers except Discord
- Access your music library or playlists
- Track your listening habits

All processing happens locally on your machine, and data only goes to Discord for displaying your status.

## Contributing

Found a bug or have an idea for improvement? Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT License - feel free to use this project however you'd like.
