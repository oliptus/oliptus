# Configuração de Secrets do GitHub

Para o CI/CD funcionar, você precisa adicionar os seguintes secrets no repositório do GitHub.

## Como adicionar secrets:

1. Acesse: https://github.com/oliptus/oliptus/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Adicione cada secret abaixo:

## Secrets necessários:

### 1. AWS_ACCESS_KEY_ID
- **Nome**: `AWS_ACCESS_KEY_ID`
- **Valor**: Sua AWS Access Key ID
- **Como obter**:
  ```bash
  cat ~/.aws/credentials | grep aws_access_key_id
  ```

### 2. AWS_SECRET_ACCESS_KEY
- **Nome**: `AWS_SECRET_ACCESS_KEY`
- **Valor**: Sua AWS Secret Access Key
- **Como obter**:
  ```bash
  cat ~/.aws/credentials | grep aws_secret_access_key
  ```

### 3. CLOUDFRONT_DISTRIBUTION_ID
- **Nome**: `CLOUDFRONT_DISTRIBUTION_ID`
- **Valor**: `E11S5KNWUNJD4Y`
- **Como obter**:
  ```bash
  cd infra/environments/dev
  tofu output cloudfront_distribution_id
  ```

## Verificação

Depois de adicionar os secrets, faça um push para a branch `main` e verifique:

1. Acesse: https://github.com/oliptus/oliptus/actions
2. Veja se o workflow está rodando
3. Aguarde o deploy completar (~2-3 minutos)
4. Acesse o site para verificar as mudanças

## Troubleshooting

Se o workflow falhar:

1. Verifique se todos os 3 secrets foram adicionados corretamente
2. Verifique se as credenciais AWS têm permissões de:
   - S3 (read/write)
   - CloudFront (create invalidation)
   - Lambda (update function)
3. Veja os logs do workflow para detalhes do erro
