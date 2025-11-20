#!/bin/bash
set -e

ENV=${1:-dev}

echo "Building web app..."
cd ../../apps/web
pnpm build

echo "Uploading to S3..."
BUCKET_NAME=$(cd ../../infra/environments/$ENV && tofu output -raw s3_bucket)
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

echo "Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(cd ../../infra/environments/$ENV && tofu output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Web deployed successfully!"
