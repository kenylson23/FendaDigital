# Deploy Estático no Netlify

Este projeto foi configurado para deploy estático no Netlify.

## Mudanças Realizadas para Deploy Estático

### 1. Calculadora de Mensalidades
- ✅ Movida toda a lógica de cálculo do backend para o frontend
- ✅ Removida dependência da API `/api/calculate-tuition`
- ✅ Cálculos agora funcionam completamente no lado do cliente

### 2. Configuração de Build
- ✅ Criado arquivo `netlify.toml` com configurações específicas
- ✅ Adicionado arquivo `_redirects` para SPA routing
- ✅ Build gera arquivos estáticos em `dist/public`

### 3. Configuração do Netlify

#### Opção 1: Upload Manual
1. Execute: `vite build`
2. Faça upload da pasta `dist/public` no Netlify

#### Opção 2: Conectar Repositório Git
1. Conecte seu repositório no Netlify
2. O arquivo `netlify.toml` já está configurado com:
   - Build command: `vite build`
   - Publish directory: `dist/public`
   - Redirects para SPA routing

## Funcionalidades que Funcionam Estaticamente

✅ **Calculadora de Mensalidades**
- Cálculo de preços por nível de ensino
- Descontos por modalidade de pagamento
- Desconto por pagamento antecipado
- Formatação de moeda angolana

✅ **Interface Multilíngue**
- Português e Chinês
- Troca de idioma em tempo real

✅ **Navegação SPA**
- Roteamento do lado do cliente
- URLs funcionam com _redirects

## Limitações do Deploy Estático

❌ **Funcionalidades Removidas/Desabilitadas:**
- Salvamento de cálculos no banco de dados
- API endpoints do backend
- Agendamento de visitas (pode ser implementado com Netlify Forms)
- Autenticação de usuários

## Próximos Passos

Para funcionalidades que requerem backend, considere:
- Netlify Forms para formulários de contato
- Netlify Functions para lógica serverless
- Integração com serviços externos (EmailJS, etc.)