#!/bin/bash
# Deploy Jack Rabbit Man page to production

set -e

echo "🐰 Deploying Jack Rabbit Man..."

# Update daily surprise
echo "📅 Updating daily surprise..."
cd /home/bob9/.openclaw/workspace/jack-rabbit-man
node update-daily.js

# Commit to git
echo "📝 Committing changes..."
git add .
COMMIT_MSG="Daily update: $(date '+%Y-%m-%d')"
git commit -m "$COMMIT_MSG" || echo "No changes to commit"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

# Deploy to production
echo "🌐 Deploying to production..."
sudo cp index.html /var/www/rabbit.pringle.com.au/index.html

echo "✅ Deployment complete!"
echo "🌍 Live at: https://rabbit.pringle.com.au"
