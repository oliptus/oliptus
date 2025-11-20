# Oliptus

Monorepo da Oliptus contendo a landing page e infraestrutura serverless na AWS.

## 🏗️ Arquitetura

- **Web**: React + Vite + TailwindCSS (hospedado em S3 + CloudFront)
- **API**: Express + Lambda (serverless via API Gateway)
- **Infraestrutura**: Terraform/OpenTofu
- **Monorepo**: Turborepo + pnpm workspaces

## 📁 Estrutura

```
oliptus/
├── apps/
│   ├── web/              # Landing page (React)
│   └── api/              # Backend API (Express)
├── packages/             # Libs compartilhadas (futuro)
├── infra/
│   ├── modules/          # Módulos Terraform
│   ├── environments/     # Configs por ambiente (dev/prod)
│   └── scripts/          # Scripts de deploy
├── package.json          # Root package
├── pnpm-workspace.yaml   # Workspace config
└── turbo.json            # Turborepo config
```

## 🚀 Quick Start

### Pré-requisitos

- Node.js 20+
- pnpm 10+
- AWS CLI configurado
- OpenTofu instalado

### Instalação

```bash
# Instalar dependências
pnpm install

# Rodar dev
pnpm dev

# Build de tudo
pnpm build
```

## 🔄 CI/CD Automático

O projeto está configurado com GitHub Actions para deploy automático!

### Como funciona:

1. Faça suas alterações no código
2. Commit e push para `main`:
   ```bash
   git add .
   git commit -m "sua mensagem"
   git push
   ```
3. **GitHub Actions automaticamente**:
   - Faz build da aplicação
   - Deploy no S3
   - Invalida cache do CloudFront
   - Atualiza Lambda (se API mudou)

### Configurar CI/CD:

Siga as instruções em [`.github/SETUP_SECRETS.md`](.github/SETUP_SECRETS.md) para adicionar os secrets necessários:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`

Depois disso, todo push na `main` vai fazer deploy automático! 🎉

## 🌐 Deploy na AWS

### 1. Configurar AWS

```bash
# Configurar credenciais
aws configure

# Criar bucket para Terraform state
aws s3 mb s3://oliptus-terraform-state --region us-east-1
aws s3api put-bucket-versioning --bucket oliptus-terraform-state --versioning-configuration Status=Enabled
```

### 2. Deploy da infraestrutura

```bash
cd infra/environments/dev
tofu init
tofu plan
tofu apply
```

### 3. Deploy da aplicação web

```bash
# Build
pnpm build --filter=@oliptus/web

# Upload para S3
aws s3 sync apps/web/dist/ s3://oliptus-dev-web/ --delete

# Invalidar cache CloudFront
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

### 4. Deploy da API

A API é deployada automaticamente via Terraform quando você roda `tofu apply`.

Para atualizar apenas a Lambda:

```bash
cd infra/environments/dev
tofu apply -target=module.api.aws_lambda_function.api
```

## 🔧 Desenvolvimento

### Web

```bash
cd apps/web
pnpm dev
```

### API

```bash
cd apps/api
pnpm dev
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Roda web e api em paralelo

# Build
pnpm build            # Build de todos os apps
pnpm build --filter=@oliptus/web   # Build apenas web

# Lint
pnpm lint             # Lint em todos os apps

# Clean
pnpm clean            # Limpa builds
```

## 🌍 URLs

### Desenvolvimento
- Web: http://localhost:5173
- API: http://localhost:3000

### Produção
- Web: https://d23eo9bibgo35n.cloudfront.net
- API: https://k4mw1hoych.execute-api.us-east-1.amazonaws.com

## 💰 Custos AWS

### Free Tier (primeiros 12 meses)
- S3, CloudFront, Lambda, API Gateway: **$0/mês**

### Após Free Tier
- Landing page com pouco tráfego: **$0.50 - $2/mês**
- Landing page com tráfego médio: **$3 - $8/mês**
- Sem tráfego: **~$0/mês** (praticamente zero)

## 🛑 Destruir Infraestrutura

Para deletar tudo e parar custos:

```bash
cd infra/environments/dev
tofu destroy -auto-approve
```

## 🔐 Segurança

- Credenciais AWS devem estar em `~/.aws/credentials`
- Nunca commitar `.env` files
- Terraform state está no S3 com versionamento habilitado

## 📝 Tecnologias

### Frontend
- React 18
- Vite 5
- TailwindCSS
- Framer Motion
- i18next (PT/EN)
- Lucide Icons

### Backend
- Node.js 20
- Express
- Serverless Express (Lambda adapter)
- Nodemailer
- CORS

### Infraestrutura
- AWS S3
- AWS CloudFront
- AWS Lambda
- AWS API Gateway
- Terraform/OpenTofu

### DevOps
- Turborepo (build system)
- pnpm workspaces
- GitHub Actions (futuro)

## 📄 Licença

ISC

## 👥 Time

Desenvolvido pela equipe Oliptus.
