variable "project_name" {
  description = "Nome do projeto"
  type        = string
}

variable "environment" {
  description = "Ambiente (dev, prod)"
  type        = string
}

variable "environment_variables" {
  description = "Variáveis de ambiente para a Lambda"
  type        = map(string)
  default     = {}
}
