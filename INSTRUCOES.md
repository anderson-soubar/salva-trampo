# Instruções para Desenvolvimento da Extensão Salva Trampo

## 📁 Estrutura de Pastas

```
salva-trampo-extension/
├── src/                    # Código fonte da extensão
│   └── extension.ts        # Código principal da extensão
├── images/                 # Imagens e ícones
│   └── icon.png           # Ícone da extensão
├── package.json           # Configurações do npm e da extensão
├── package.nls.json       # Traduções
├── README.md              # Documentação principal
├── CHANGELOG.md           # Histórico de versões
├── LICENSE                # Licença MIT
└── INSTRUCOES.md          # Este arquivo
```

## 🛠️ Como Desenvolver

1. **Configuração do Ambiente**
   ```bash
   # Instalar dependências
   npm install

   # Compilar o TypeScript
   npm run compile

   # Gerar pacote VSIX
   npm run package
   ```

2. **Publicação**
   ```bash
   # Publicar no VS Code Marketplace
   npm run publish
   ```

3. **Teste Local**
   - Pressione F5 no VS Code para iniciar uma nova janela com a extensão
   - Use Ctrl+Shift+P e digite "Developer: Reload Window" para recarregar

## 📝 Convenções de Código

1. **Nomes de Arquivos**
   - Use camelCase para arquivos JavaScript/TypeScript
   - Use kebab-case para arquivos de configuração

2. **Commits**
   - Use emojis para indicar o tipo de mudança
   - Exemplo: "✨ Adiciona salvamento duplo rápido"

3. **Versões**
   - Seguir semver (MAJOR.MINOR.PATCH)
   - Atualizar CHANGELOG.md em cada release

## 🔄 Fluxo de Trabalho

1. **Nova Feature**
   - Criar branch: `feature/nome-da-feature`
   - Desenvolver e testar
   - Atualizar documentação
   - Criar Pull Request

2. **Correção de Bug**
   - Criar branch: `fix/descricao-do-bug`
   - Corrigir e testar
   - Atualizar CHANGELOG.md
   - Criar Pull Request

3. **Release**
   - Atualizar versão no package.json
   - Atualizar CHANGELOG.md
   - Gerar VSIX: `npm run package`
   - Publicar: `npm run publish`

## 📦 Dependências Principais

- vscode: ^1.74.0
- typescript: ^4.8.4
- @types/node: ^16.11.7
- @types/vscode: ^1.74.0

## 🔍 Verificações Antes de Publicar

1. [ ] Versão atualizada no package.json
2. [ ] CHANGELOG.md atualizado
3. [ ] README.md atualizado
4. [ ] Código compilado sem erros
5. [ ] Testes realizados
6. [ ] VSIX gerado e testado

## 📧 Contato

- GitHub: [anderson-soubar](https://github.com/anderson-soubar)
- Email: andersonrecreio@hotmail.com 