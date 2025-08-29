const { exec } = require('child_process');
const path = require('path');
const DiscordRPC = require('discord-rpc');

// Discord Application Client ID - You need to create an application at https://discord.com/developers/applications
const CLIENT_ID = '1234567890123456789'; // Replace with your Discord App Client ID

// Initialize Discord RPC
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

// Update interval (in milliseconds)
const UPDATE_INTERVAL = 5000; // Update every 5 seconds

// AppleScript path
const APPLESCRIPT_PATH = path.join(__dirname, 'getAppleMusicInfo.applescript');

// Get Apple Music info
function getAppleMusicInfo() {
    return new Promise((resolve, reject) => {
        exec(`osascript "${APPLESCRIPT_PATH}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error getting Apple Music info:', error);
                reject(error);
                return;
            }
            
            try {
                // Parse the JSON-like string from AppleScript
                // Handle escaped quotes in song/artist/album names
                const cleanedOutput = stdout.trim()
                    .replace(/\\"/g, '"')
                    .replace(/""/g, '"');
                
                const data = JSON.parse(cleanedOutput);
                resolve(data);
            } catch (parseError) {
                console.error('Error parsing Apple Music data:', parseError);
                console.error('Raw output:', stdout);
                resolve({ playing: false, error: true });
            }
        });
    });
}

// Update Discord presence
async function updatePresence() {
    try {
        const musicInfo = await getAppleMusicInfo();
        
        if (musicInfo.playing) {
            // Calculate timestamps for time remaining
            const now = Date.now();
            const endTimestamp = now + (musicInfo.remaining * 1000);
            
            const presence = {
                details: `${musicInfo.name}`,
                state: `by ${musicInfo.artist}`,
                startTimestamp: now,
                endTimestamp: endTimestamp,
                largeImageKey: 'apple_music', // You'll need to upload this image to your Discord app
                largeImageText: musicInfo.album,
                smallImageKey: 'playing',
                smallImageText: 'Playing',
                instance: false,
            };
            
            rpc.setActivity(presence);
            console.log(`✅ Now playing: ${musicInfo.name} by ${musicInfo.artist}`);
        } else if (musicInfo.paused) {
            const presence = {
                details: `${musicInfo.name}`,
                state: `by ${musicInfo.artist} (Paused)`,
                largeImageKey: 'apple_music',
                largeImageText: musicInfo.album,
                smallImageKey: 'paused',
                smallImageText: 'Paused',
                instance: false,
            };
            
            rpc.setActivity(presence);
            console.log(`⏸️  Paused: ${musicInfo.name} by ${musicInfo.artist}`);
        } else {
            // Clear presence when not playing
            rpc.clearActivity();
            console.log('🎵 No music playing');
        }
    } catch (error) {
        console.error('Error updating presence:', error);
    }
}

// Main function
async function main() {
    console.log('🚀 Starting Discord Apple Music Presence...');
    console.log('📝 Make sure to:');
    console.log('   1. Replace CLIENT_ID with your Discord App ID');
    console.log('   2. Have Apple Music (Music app) running');
    console.log('   3. Have Discord running\n');
    
    try {
        await rpc.login({ clientId: CLIENT_ID });
        console.log('✅ Connected to Discord!\n');
        
        // Initial update
        await updatePresence();
        
        // Set up periodic updates
        setInterval(updatePresence, UPDATE_INTERVAL);
        
    } catch (error) {
        console.error('❌ Failed to connect to Discord:', error);
        console.log('\nMake sure:');
        console.log('1. Discord is running');
        console.log('2. You have replaced the CLIENT_ID with a valid Discord App ID');
        console.log('3. You created an app at https://discord.com/developers/applications');
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    rpc.clearActivity();
    rpc.destroy();
    process.exit(0);
});

// Start the application
rpc.on('ready', () => {
    main();
});

// Handle RPC errors
rpc.on('error', (error) => {
    console.error('Discord RPC Error:', error);
});
