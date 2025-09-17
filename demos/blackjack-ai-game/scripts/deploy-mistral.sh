#!/bin/bash

# Deploy Blackjack AI Game with Mistral 24B model
# This script deploys the blackjack demo using the Mistral model via Llama Stack

set -e

NAMESPACE="blackjack-ai-demo"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../" && pwd)"

echo "🎮 Deploying Blackjack AI Game with Mistral 24B model..."
echo "📁 Working directory: $REPO_ROOT"
echo "🏷️ Namespace: $NAMESPACE"

# Check if we're in the right directory
if [[ ! -f "$REPO_ROOT/package.json" ]]; then
    echo "❌ Error: Not in the correct directory. Please run from the blackjack-ai-game root."
    exit 1
fi

# Label namespace for demo purposes  
echo "🔧 Setting up namespace: $NAMESPACE"
oc label namespace "$NAMESPACE" purpose=ai-gaming-demo --overwrite 2>/dev/null || echo "Note: Cannot label namespace (insufficient permissions)"

# Deploy using kustomize with mistral overlay
echo "🚀 Deploying with Mistral configuration..."
oc apply -k "$REPO_ROOT/kubernetes/deploy-demo/overlays/mistral"

# Wait for deployments to be ready
echo "⏳ Waiting for deployments to be ready..."
oc rollout status deployment/llamastack-deployment -n "$NAMESPACE" --timeout=300s
oc rollout status deployment/frontend-deployment -n "$NAMESPACE" --timeout=300s
oc rollout status deployment/ntfy-mcp-deployment -n "$NAMESPACE" --timeout=300s

# Get route URL
echo "🌍 Getting application URL..."
ROUTE_URL=$(oc get route blackjack-ui -n "$NAMESPACE" -o jsonpath='{.spec.host}' 2>/dev/null || echo "Route not found")

if [[ "$ROUTE_URL" != "Route not found" ]]; then
    echo "✅ Blackjack AI Game deployed successfully!"
    echo "🎮 Access the game at: https://$ROUTE_URL"
    echo ""
    echo "🏷️ Current configuration:"
    echo "  - Model: Mistral Small 24B"
    echo "  - Provider: Remote (MaaS)"
    echo "  - Namespace: $NAMESPACE"
    echo ""
    echo "📱 Generate QR code with: ./scripts/generate-qr.sh"
else
    echo "⚠️ Deployment completed but route not found. Check manually:"
    echo "   oc get routes -n $NAMESPACE"
fi

echo "🔍 To check status: oc get pods -n $NAMESPACE"
echo "📋 To view logs: oc logs -f deployment/llamastack-deployment -n $NAMESPACE"
