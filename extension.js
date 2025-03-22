const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let backupEnabled = true;
let lastSaveTime = 0;
let lastSaveFile = null;

function activate(context) {
    console.log('Salva Trampo está ativo!');

    // Carregar configurações
    const config = vscode.workspace.getConfiguration('salvaTrampo');
    const DOUBLE_SAVE_THRESHOLD = config.get('doubleSaveThreshold', 3000); // 3 segundos por padrão

    // Criar pasta de backup se não existir
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('Salva Trampo: Nenhuma pasta de trabalho aberta!');
        return;
    }

    const backupPath = path.join(workspaceFolder, 'backups');
    if (!fs.existsSync(backupPath)) {
        try {
            fs.mkdirSync(backupPath, { recursive: true });
            console.log(`Pasta de backup criada: ${backupPath}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Salva Trampo: Erro ao criar pasta de backup: ${error.message}`);
            return;
        }
    }

    // Função para formatar data no padrão brasileiro
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `(${day}-${month}-${year} ${hours}-${minutes}-${seconds})`;
    }

    // Função para fazer backup
    function createBackup(document) {
        if (!backupEnabled) {
            console.log('Backup está desabilitado');
            return;
        }

        const currentTime = Date.now();
        const fileName = path.basename(document.fileName);
        const fileExt = path.extname(fileName);
        const fileNameWithoutExt = path.basename(fileName, fileExt);

        console.log(`Arquivo salvo: ${fileName}`);
        console.log(`Último arquivo: ${lastSaveFile}`);
        console.log(`Tempo desde último salvamento: ${currentTime - lastSaveTime}ms`);

        // Verifica se é o mesmo arquivo e se está dentro do limite de tempo
        if (lastSaveFile === document.fileName && 
            (currentTime - lastSaveTime) < DOUBLE_SAVE_THRESHOLD) {
            
            try {
                const now = new Date();
                const formattedDate = formatDate(now);
                const backupFileName = `${fileNameWithoutExt}${formattedDate}${fileExt}`;
                const backupFilePath = path.join(backupPath, backupFileName);

                console.log(`Criando backup em: ${backupFilePath}`);
                fs.copyFileSync(document.fileName, backupFilePath);

                // Mostrar notificação de sucesso
                vscode.window.showInformationMessage(
                    `💾 Salva Trampo: Backup criado com sucesso!`,
                    backupFileName
                );
                
                // Resetar as variáveis de controle
                lastSaveTime = 0;
                lastSaveFile = null;
                console.log('Variáveis de controle resetadas');
            } catch (error) {
                console.error(`Erro ao criar backup: ${error.message}`);
                vscode.window.showErrorMessage(`Salva Trampo: Erro ao criar backup: ${error.message}`);
            }
        } else {
            // Atualizar o último salvamento
            lastSaveTime = currentTime;
            lastSaveFile = document.fileName;
            console.log(`Primeiro salvamento registrado. Aguardando segundo salvamento...`);
            
            // Mostrar notificação de aguardando
            vscode.window.showInformationMessage(
                `⏳ Salva Trampo: Pressione Ctrl+S novamente em até ${DOUBLE_SAVE_THRESHOLD/1000} segundos para criar backup`
            );
        }
    }

    // Registrar evento de salvamento
    let saveDisposable = vscode.workspace.onDidSaveTextDocument((document) => {
        console.log('Evento de salvamento detectado');
        createBackup(document);
    });

    // Comando para habilitar backup
    let enableDisposable = vscode.commands.registerCommand('salvaTrampo.enableAutoSave', () => {
        backupEnabled = true;
        console.log('Backup automático habilitado');
        vscode.window.showInformationMessage('🔄 Salva Trampo: Backup automático habilitado!');
    });

    // Comando para desabilitar backup
    let disableDisposable = vscode.commands.registerCommand('salvaTrampo.disableAutoSave', () => {
        backupEnabled = false;
        console.log('Backup automático desabilitado');
        vscode.window.showInformationMessage('⏸️ Salva Trampo: Backup automático desabilitado!');
    });

    // Adicionar ao contexto de subscrições
    context.subscriptions.push(saveDisposable, enableDisposable, disableDisposable);
}

function deactivate() {
    console.log('Salva Trampo está inativo!');
}

module.exports = {
    activate,
    deactivate
}; 