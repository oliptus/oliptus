terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "oliptus-terraform-state"
    key    = "dev/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

module "web" {
  source = "../../modules/web"

  project_name = var.project_name
  environment  = var.environment
}

module "api" {
  source = "../../modules/api"

  project_name = var.project_name
  environment  = var.environment

  environment_variables = {
    NODE_ENV = "development"
  }
}
