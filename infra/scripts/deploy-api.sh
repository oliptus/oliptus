#!/bin/bash
set -e

ENV=${1:-dev}

echo "Installing API dependencies..."
cd ../../apps/api
pnpm install --prod

echo "Deploying Lambda via Terraform..."
cd ../../infra/environments/$ENV
tofu apply -target=module.api -auto-approve

echo "API deployed successfully!"
