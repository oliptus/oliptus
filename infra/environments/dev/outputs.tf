output "web_url" {
  description = "URL do site"
  value       = module.web.website_url
}

output "api_endpoint" {
  description = "Endpoint da API"
  value       = module.api.api_endpoint
}

output "s3_bucket" {
  description = "Nome do bucket S3"
  value       = module.web.bucket_name
}

output "cloudfront_distribution_id" {
  description = "ID da distribuição CloudFront"
  value       = module.web.cloudfront_distribution_id
}
