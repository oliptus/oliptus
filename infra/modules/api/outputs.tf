output "api_endpoint" {
  description = "Endpoint da API"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "lambda_function_name" {
  description = "Nome da função Lambda"
  value       = aws_lambda_function.api.function_name
}
