#!/bin/bash

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"

echo "Deploying Discord Apple Music Presence to GitHub..."
echo "Note: Make sure you've created the repository on GitHub first!"
echo ""
echo "Enter your GitHub username (or press Enter if it's $GITHUB_USERNAME):"
read -r username
if [ -n "$username" ]; then
    GITHUB_USERNAME="$username"
fi

# Add remote origin
git remote add origin "https://github.com/$GITHUB_USERNAME/discord-apple-music-presence.git"

# Push to GitHub
git push -u origin main

echo ""
echo "Successfully pushed to GitHub!"
echo "Your repository is now available at: https://github.com/$GITHUB_USERNAME/discord-apple-music-presence"
echo ""
echo "Share this project with others who want to use it!"
