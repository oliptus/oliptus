# Infraestrutura Oliptus

Infraestrutura como código usando OpenTofu/Terraform.

## Arquitetura

- **Web**: S3 + CloudFront (React estático)
- **API**: Lambda + API Gateway (Express serverless)

## Pré-requisitos

- AWS CLI configurado
- OpenTofu instalado (`brew install opentofu`)
- pnpm instalado

## Setup Inicial

### 1. Criar bucket para Terraform state

```bash
aws s3 mb s3://oliptus-terraform-state --region us-east-1
aws s3api put-bucket-versioning --bucket oliptus-terraform-state --versioning-configuration Status=Enabled
```

### 2. Inicializar Terraform

```bash
cd infra/environments/dev
tofu init
```

### 3. Deploy completo

```bash
tofu plan
tofu apply
```

## Deploy Individual

### Web (S3 + CloudFront)

```bash
cd infra/scripts
chmod +x deploy-web.sh
./deploy-web.sh dev
```

### API (Lambda)

```bash
cd infra/scripts
chmod +x deploy-api.sh
./deploy-api.sh dev
```

## Comandos Úteis

```bash
# Ver outputs
tofu output

# Destruir infraestrutura
tofu destroy

# Ver URL do site
tofu output web_url

# Ver endpoint da API
tofu output api_endpoint
```

## Estrutura

```
infra/
├── modules/
│   ├── web/          # S3 + CloudFront
│   └── api/          # Lambda + API Gateway
├── environments/
│   ├── dev/          # Ambiente de desenvolvimento
│   └── prod/         # Ambiente de produção
└── scripts/
    ├── deploy-web.sh
    └── deploy-api.sh
```
