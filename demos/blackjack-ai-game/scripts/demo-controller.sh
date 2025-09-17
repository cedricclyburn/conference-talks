#!/bin/bash

# Blackjack AI Game Demo Controller
# Easily switch between Ollama (local) and Mistral/vLLM (remote) deployments

set -e

NAMESPACE="blackjack-demo"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../" && pwd)"

function usage() {
    echo "🎮 Blackjack AI Game Demo Controller"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  deploy-mistral  Deploy with Mistral Small 24B (recommended for demo)"
    echo "  deploy-ollama   Deploy with local Ollama model"
    echo "  deploy-vllm     Deploy with remote vLLM model"
    echo "  status          Check deployment status"
    echo "  url             Get demo URL"
    echo "  qr              Generate QR code"
    echo "  logs            View Llama Stack logs"
    echo "  cleanup         Clean up demo resources"
    echo ""
    echo "🎯 Current namespace: $NAMESPACE"
}

function check_namespace() {
    if ! oc get namespace "$NAMESPACE" >/dev/null 2>&1; then
        echo "📦 Creating namespace: $NAMESPACE"
        oc new-project "$NAMESPACE" --description="AI-powered blackjack game demo for conference presentation" --display-name="Blackjack AI Demo"
    fi
    oc project "$NAMESPACE"
}

function deploy_mistral() {
    echo "🚀 Deploying Blackjack AI Game with Mistral Small 24B..."
    check_namespace
    
    # Update configuration for Mistral
    oc patch configmap run-config-mistral -n "$NAMESPACE" --type merge -p '{
        "data": {
            "config.yaml": "version: '\''2'\''\nimage_name: blackjack-mistral\napis:\n- agents\n- datasetio\n- eval\n- inference\n- safety\n- scoring\n- telemetry\n- tool_runtime\n- vector_io\nproviders:\n  inference:\n  - provider_id: mistral-remote\n    provider_type: remote::vllm\n    config:\n      url: ${env.MISTRAL_URL:=https://mistral-small-24b-w8a8-maas-apicast-production.apps.prod.rhoai.rh-aiservices-bu.com:443/v1}\n      max_tokens: 4096\n      api_token: ${env.MISTRAL_API_TOKEN:=62fd2860ea715b8dfed124b80dd31715}\n      tls_verify: true\n  - provider_id: sentence-transformers\n    provider_type: inline::sentence-transformers\n    config: {}\nmodels:\n- metadata: {}\n  model_id: mistral-small-24b-w8a8\n  provider_id: mistral-remote\n  model_type: llm\n- metadata:\n    embedding_dimension: 384\n  model_id: all-MiniLM-L6-v2\n  provider_id: sentence-transformers\n  model_type: embedding\nmetadata_store:\n  type: sqlite\n  db_path: ${env.SQLITE_STORE_DIR:~/.llama/distributions/blackjack-mistral}/registry.db"
        }
    }' 2>/dev/null || echo "Config already exists"
    
    oc patch configmap blackjack-config -n "$NAMESPACE" --type merge -p '{
        "data": {
            "VITE_USE_LOCAL_AI": "false",
            "VITE_AI_PROVIDER": "mistral",
            "VITE_LLAMA_STACK_ENDPOINT": "http://llamastack-service:8321"
        }
    }' 2>/dev/null || echo "Config already exists"
    
    oc rollout restart deployment/llamastack-deployment -n "$NAMESPACE"
    echo "✅ Mistral deployment configured!"
}

function deploy_ollama() {
    echo "🚀 Deploying Blackjack AI Game with Ollama..."
    check_namespace
    echo "Note: Ollama deployment requires local GPU resources"
    echo "Implementation: Update config to use ollama provider..."
}

function get_status() {
    echo "📊 Deployment Status:"
    echo ""
    echo "Namespace: $NAMESPACE"
    oc get pods -n "$NAMESPACE" 2>/dev/null || echo "No pods found"
    echo ""
    echo "Services:"
    oc get svc -n "$NAMESPACE" 2>/dev/null || echo "No services found"
    echo ""
    echo "Routes:"
    oc get routes -n "$NAMESPACE" 2>/dev/null || echo "No routes found"
}

function get_url() {
    local route_url
    route_url=$(oc get route blackjack-ui -n "$NAMESPACE" -o jsonpath='{.spec.host}' 2>/dev/null || echo "")
    
    if [[ -n "$route_url" ]]; then
        echo "🎮 Demo URL: https://$route_url"
        echo "📱 Share this URL with your audience!"
    else
        echo "❌ Route not found. Deploy the demo first."
        exit 1
    fi
}

function generate_qr() {
    local route_url
    route_url=$(oc get route blackjack-ui -n "$NAMESPACE" -o jsonpath='{.spec.host}' 2>/dev/null || echo "")
    
    if [[ -z "$route_url" ]]; then
        echo "❌ Route not found. Deploy the demo first."
        exit 1
    fi
    
    local full_url="https://$route_url"
    local qr_file="blackjack-demo-qr.png"
    
    if ! command -v qrencode &> /dev/null; then
        echo "🔧 Installing qrencode..."
        brew install qrencode 2>/dev/null || echo "Please install qrencode manually"
    fi
    
    echo "🎨 Creating QR code for: $full_url"
    qrencode -o "$qr_file" -s 10 -m 2 "$full_url"
    
    echo "✅ QR code generated: $qr_file"
    echo "🎮 Demo URL: $full_url"
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "$qr_file"
    fi
}

function view_logs() {
    echo "📋 Llama Stack logs:"
    oc logs -f deployment/llamastack-deployment -n "$NAMESPACE" --tail=50
}

function cleanup() {
    echo "🧹 Cleaning up demo resources..."
    read -p "Are you sure you want to delete the $NAMESPACE namespace? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        oc delete project "$NAMESPACE"
        echo "✅ Cleanup completed"
    else
        echo "Cleanup cancelled"
    fi
}

# Main command handling
case "${1:-}" in
    deploy-mistral)
        deploy_mistral
        ;;
    deploy-ollama)
        deploy_ollama
        ;;
    deploy-vllm)
        echo "🚀 vLLM deployment coming soon..."
        ;;
    status)
        get_status
        ;;
    url)
        get_url
        ;;
    qr)
        generate_qr
        ;;
    logs)
        view_logs
        ;;
    cleanup)
        cleanup
        ;;
    *)
        usage
        ;;
esac
