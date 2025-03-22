const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let backupEnabled = true;
let lastSaveTime = 0;
let lastSaveFile = null;
const DOUBLE_SAVE_THRESHOLD = 3000; // 3 segundos em milissegundos

function activate(context) {
    console.log('Salva Trampo está ativo!');

    // Criar pasta de backup se não existir
    const backupFolder = vscode.workspace.getConfiguration('salvaTrampo').get('backupFolder');
    const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const backupPath = path.join(workspaceFolder, backupFolder);

    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
    }

    // Função para formatar data no padrão brasileiro
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `(${day}/${month}/${year} ${hours}:${minutes}:${seconds})`;
    }

    // Função para fazer backup
    function createBackup(document) {
        if (!backupEnabled) return;

        const currentTime = Date.now();
        const fileName = path.basename(document.fileName);
        const fileExt = path.extname(fileName);
        const fileNameWithoutExt = path.basename(fileName, fileExt);

        // Verifica se é o mesmo arquivo e se está dentro do limite de tempo
        if (lastSaveFile === document.fileName && 
            (currentTime - lastSaveTime) < DOUBLE_SAVE_THRESHOLD) {
            
            const now = new Date();
            const formattedDate = formatDate(now);
            const backupFileName = `${fileNameWithoutExt}${formattedDate}${fileExt}`;
            const backupFilePath = path.join(backupPath, backupFileName);

            fs.copyFileSync(document.fileName, backupFilePath);

            // Mostrar notificação
            vscode.window.showInformationMessage(`💾 Salva Trampo: Backup criado (salvamento duplo rápido): ${backupFileName}`);
            
            // Resetar as variáveis de controle
            lastSaveTime = 0;
            lastSaveFile = null;
        } else {
            // Atualizar o último salvamento
            lastSaveTime = currentTime;
            lastSaveFile = document.fileName;
            
            // Mostrar notificação de aguardando
            vscode.window.showInformationMessage(`⏳ Salva Trampo: Aguardando segundo salvamento rápido...`);
        }
    }

    // Registrar evento de salvamento
    let saveDisposable = vscode.workspace.onDidSaveTextDocument(document => {
        createBackup(document);
    });

    // Comando para habilitar backup
    let enableDisposable = vscode.commands.registerCommand('salva-trampo.enable', () => {
        backupEnabled = true;
        vscode.window.showInformationMessage('🔄 Salva Trampo habilitado!');
    });

    // Comando para desabilitar backup
    let disableDisposable = vscode.commands.registerCommand('salva-trampo.disable', () => {
        backupEnabled = false;
        vscode.window.showInformationMessage('⏸️ Salva Trampo desabilitado!');
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