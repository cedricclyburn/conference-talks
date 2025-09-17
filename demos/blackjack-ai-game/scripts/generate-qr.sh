#!/bin/bash

# Generate QR code for the Blackjack AI Game demo
# This script creates a QR code that audience members can scan during presentations

set -e

NAMESPACE="blackjack-demo"
QR_FILE="blackjack-demo-qr.png"

echo "📱 Generating QR code for Blackjack AI Game demo..."

# Get route URL
ROUTE_URL=$(oc get route blackjack-ui -n "$NAMESPACE" -o jsonpath='{.spec.host}' 2>/dev/null || echo "")

if [[ -z "$ROUTE_URL" ]]; then
    echo "❌ Error: Could not find route for blackjack-ui in namespace $NAMESPACE"
    echo "Make sure the demo is deployed first:"
    echo "  ./scripts/deploy-mistral.sh  (recommended for demo)"
    echo "  ./scripts/deploy-ollama.sh   (for local inference)"
    exit 1
fi

FULL_URL="https://$ROUTE_URL"

# Check if qrencode is installed
if ! command -v qrencode &> /dev/null; then
    echo "🔧 Installing qrencode..."
    if command -v brew &> /dev/null; then
        brew install qrencode
    elif command -v yum &> /dev/null; then
        sudo yum install -y qrencode
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y qrencode
    else
        echo "❌ Please install qrencode manually and rerun this script"
        echo "URL to use: $FULL_URL"
        exit 1
    fi
fi

# Generate QR code
echo "🎨 Creating QR code for: $FULL_URL"
qrencode -o "$QR_FILE" -s 10 -m 2 "$FULL_URL"

echo "✅ QR code generated: $QR_FILE"
echo "🎮 Demo URL: $FULL_URL"
echo ""
echo "📱 Instructions for presentation:"
echo "1. Display the QR code ($QR_FILE) on screen"
echo "2. Ask audience to scan with their phones"
echo "3. They can play the AI-powered blackjack game"
echo "4. Show the AI performance comparison features"
echo ""
echo "🎯 Demo highlights to mention:"
echo "- AI strategy recommendations via Llama Stack"
echo "- MCP integration for notifications"
echo "- Real-time performance monitoring"
echo "- Model comparison (local vs remote)"

# If running on macOS, optionally open the QR code
if [[ "$OSTYPE" == "darwin"* ]] && command -v open &> /dev/null; then
    echo "🖼️ Opening QR code..."
    open "$QR_FILE"
fi
