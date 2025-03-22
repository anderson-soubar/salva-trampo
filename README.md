# Salva Trampo - Extensão VS Code

Uma extensão que salva automaticamente backups dos seus arquivos quando você faz um salvamento duplo rápido (dois Ctrl+S em menos de 3 segundos).

## ✨ Funcionalidades

- 💾 Backup automático com salvamento duplo rápido
- ⏱️ Detecta dois salvamentos em menos de 3 segundos
- 📅 Formato de data brasileiro nos arquivos de backup
- 🔄 Pode ser habilitado/desabilitado facilmente
- 📁 Pasta de backup configurável
- ⚡ Performance otimizada

## 🚀 Como Usar

1. Instale a extensão no VS Code
2. Salve seu arquivo normalmente (Ctrl+S)
3. Você verá a mensagem "Aguardando segundo salvamento rápido..."
4. Salve novamente em menos de 3 segundos
5. O backup será criado automaticamente!

## ⚙️ Configurações

Você pode configurar a extensão nas configurações do VS Code:

- `salvaTrampo.enabled`: Habilita/desabilita a extensão (padrão: true)
- `salvaTrampo.backupFolder`: Define a pasta de backup (padrão: "backups")
- `salvaTrampo.doubleSaveThreshold`: Tempo máximo entre salvamentos (padrão: 3000ms = 3s)

## 📝 Formato dos Arquivos de Backup

Os arquivos de backup seguem o formato:
```
nome_do_arquivo(DD/MM/AAAA HH:MM:SS).extensao
```

Exemplo:
```
teste(22/03/2024 15:30:45).txt
```

## 🛠️ Comandos Disponíveis

- `Salva Trampo: Habilitar` - Habilita a extensão
- `Salva Trampo: Desabilitar` - Desabilita a extensão

## 📦 Requisitos

- VS Code versão 1.74.0 ou superior

## 🔄 Histórico de Versões

### 0.0.2
- Adicionado salvamento duplo rápido
- Novo formato de data brasileiro
- Configuração de tempo limite entre salvamentos

### 0.0.1
- Versão inicial
- Backup automático ao salvar

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.

## 📧 Contato

- GitHub: [anderson-soubar](https://github.com/anderson-soubar)
- Email: andersonrecreio@hotmail.com
