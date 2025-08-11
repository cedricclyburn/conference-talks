#!/usr/bin/env python3
"""
Utility functions for Blackjack AI Game development and testing.

This module provides helper functions for:
- AI model testing and validation
- Performance benchmarking
- Configuration management
- Development automation
"""

import json
import time
import requests
import statistics
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path


@dataclass
class ModelResponse:
    """Represents a response from an AI model."""
    response: str
    response_time: float
    success: bool
    error: Optional[str] = None


@dataclass
class PerformanceMetrics:
    """Performance metrics for AI model evaluation."""
    avg_response_time: float
    min_response_time: float
    max_response_time: float
    success_rate: float
    total_requests: int


class AIModelTester:
    """Test and benchmark AI models for blackjack strategy recommendations."""
    
    def __init__(self, local_endpoint: str = "http://localhost:11434", 
                 remote_endpoint: str = None, remote_api_key: str = None):
        self.local_endpoint = local_endpoint
        self.remote_endpoint = remote_endpoint
        self.remote_api_key = remote_api_key
        
    def test_local_model(self, prompt: str, model: str = "llama3.2:1b") -> ModelResponse:
        """Test local AI model with a given prompt."""
        start_time = time.time()
        
        try:
            response = requests.post(
                f"{self.local_endpoint}/api/generate",
                json={
                    "model": model,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=10
            )
            
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                result = response.json()
                return ModelResponse(
                    response=result.get("response", ""),
                    response_time=response_time,
                    success=True
                )
            else:
                return ModelResponse(
                    response="",
                    response_time=response_time,
                    success=False,
                    error=f"HTTP {response.status_code}"
                )
                
        except Exception as e:
            return ModelResponse(
                response="",
                response_time=time.time() - start_time,
                success=False,
                error=str(e)
            )
    
    def test_remote_model(self, prompt: str) -> ModelResponse:
        """Test remote AI model with a given prompt."""
        if not self.remote_endpoint or not self.remote_api_key:
            return ModelResponse(
                response="",
                response_time=0,
                success=False,
                error="Remote endpoint or API key not configured"
            )
        
        start_time = time.time()
        
        try:
            headers = {
                "Authorization": f"Bearer {self.remote_api_key}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(
                self.remote_endpoint,
                json={
                    "prompt": prompt,
                    "max_tokens": 100
                },
                headers=headers,
                timeout=15
            )
            
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                result = response.json()
                return ModelResponse(
                    response=result.get("response", ""),
                    response_time=response_time,
                    success=True
                )
            else:
                return ModelResponse(
                    response="",
                    response_time=response_time,
                    success=False,
                    error=f"HTTP {response.status_code}"
                )
                
        except Exception as e:
            return ModelResponse(
                response="",
                response_time=time.time() - start_time,
                success=False,
                error=str(e)
            )
    
    def benchmark_models(self, test_prompts: List[str], iterations: int = 5) -> Dict[str, PerformanceMetrics]:
        """Benchmark both local and remote models with test prompts."""
        results = {"local": [], "remote": []}
        
        print(f"🧪 Running benchmark with {len(test_prompts)} prompts, {iterations} iterations each")
        
        for i, prompt in enumerate(test_prompts):
            print(f"📊 Testing prompt {i+1}/{len(test_prompts)}: {prompt[:50]}...")
            
            # Test local model
            for _ in range(iterations):
                result = self.test_local_model(prompt)
                results["local"].append(result)
                time.sleep(0.5)  # Small delay between requests
            
            # Test remote model
            for _ in range(iterations):
                result = self.test_remote_model(prompt)
                results["remote"].append(result)
                time.sleep(0.5)
        
        # Calculate metrics
        metrics = {}
        for model_type, responses in results.items():
            successful_responses = [r for r in responses if r.success]
            response_times = [r.response_time for r in successful_responses]
            
            if response_times:
                metrics[model_type] = PerformanceMetrics(
                    avg_response_time=statistics.mean(response_times),
                    min_response_time=min(response_times),
                    max_response_time=max(response_times),
                    success_rate=len(successful_responses) / len(responses),
                    total_requests=len(responses)
                )
            else:
                metrics[model_type] = PerformanceMetrics(
                    avg_response_time=0,
                    min_response_time=0,
                    max_response_time=0,
                    success_rate=0,
                    total_requests=len(responses)
                )
        
        return metrics


def get_blackjack_test_prompts() -> List[str]:
    """Get standard blackjack strategy test prompts."""
    return [
        "I have a hard 16 and the dealer shows a 10. What should I do?",
        "I have two 8s and the dealer shows a 6. Should I split?",
        "I have an Ace and a 6 (soft 17) and the dealer shows a 3. Hit or stand?",
        "I have a 10 and a Jack (20) and the dealer shows an Ace. What's my move?",
        "I have a pair of Aces and the dealer shows a 5. Should I split?",
        "I have a 5 and a 6 (11) and the dealer shows a 9. Should I double down?",
        "I have a King and a 9 (19) and the dealer shows a 7. What should I do?",
        "I have two 10s and the dealer shows a 6. Should I split or stand?"
    ]


def load_config(config_path: str = ".env.local") -> Dict[str, str]:
    """Load configuration from environment file."""
    config = {}
    config_file = Path(config_path)
    
    if config_file.exists():
        with open(config_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    config[key.strip()] = value.strip()
    
    return config


def print_performance_report(metrics: Dict[str, PerformanceMetrics]):
    """Print a formatted performance report."""
    print("\n" + "="*60)
    print("🎮 BLACKJACK AI PERFORMANCE REPORT")
    print("="*60)
    
    for model_type, metric in metrics.items():
        print(f"\n🤖 {model_type.upper()} MODEL:")
        print(f"   Average Response Time: {metric.avg_response_time:.2f}s")
        print(f"   Min Response Time:     {metric.min_response_time:.2f}s")
        print(f"   Max Response Time:     {metric.max_response_time:.2f}s")
        print(f"   Success Rate:          {metric.success_rate:.1%}")
        print(f"   Total Requests:        {metric.total_requests}")
    
    # Comparison
    if "local" in metrics and "remote" in metrics:
        local = metrics["local"]
        remote = metrics["remote"]
        
        if local.avg_response_time > 0 and remote.avg_response_time > 0:
            speed_diff = remote.avg_response_time / local.avg_response_time
            print(f"\n⚡ COMPARISON:")
            print(f"   Local is {speed_diff:.1f}x faster than remote")
            print(f"   Local success rate: {local.success_rate:.1%}")
            print(f"   Remote success rate: {remote.success_rate:.1%}")
    
    print("\n" + "="*60)


def main():
    """Main function for running AI model tests."""
    print("🎮 Blackjack AI Model Testing Utility")
    print("====================================")
    
    # Load configuration
    config = load_config()
    local_endpoint = config.get("VITE_LOCAL_AI_ENDPOINT", "http://localhost:11434")
    remote_endpoint = config.get("VITE_REMOTE_AI_ENDPOINT")
    remote_api_key = config.get("VITE_REMOTE_AI_KEY")
    
    # Initialize tester
    tester = AIModelTester(local_endpoint, remote_endpoint, remote_api_key)
    
    # Get test prompts
    test_prompts = get_blackjack_test_prompts()
    
    # Run benchmark
    metrics = tester.benchmark_models(test_prompts, iterations=3)
    
    # Print results
    print_performance_report(metrics)


if __name__ == "__main__":
    main()