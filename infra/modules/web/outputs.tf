output "bucket_name" {
  description = "Nome do bucket S3"
  value       = aws_s3_bucket.web.id
}

output "cloudfront_domain" {
  description = "Domínio do CloudFront"
  value       = aws_cloudfront_distribution.web.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID da distribuição CloudFront"
  value       = aws_cloudfront_distribution.web.id
}

output "website_url" {
  description = "URL do site"
  value       = "https://${aws_cloudfront_distribution.web.domain_name}"
}
