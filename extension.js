const vscode = require('vscode');

/**
 * KRA Utility Helper Class
 * Provides logic for tax calculations and eTIMS data structure validation
 */
class KRAHelper {
    static VAT_RATE = 0.16;

    static calculate(netAmount) {
        const vat = netAmount * this.VAT_RATE;
        const gross = netAmount + vat;
        return {
            net: netAmount.toFixed(2),
            vat: vat.toFixed(2),
            gross: gross.toFixed(2),
            timestamp: new Date().toISOString()
        };
    }

    static generatePayloadId() {
        return `KRA-INV-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Activating KRA Dev Snippets 2026 Utility...');

    // Command 1: Calculate Tax on Selected Text
    let calcTaxDisposable = vscode.commands.registerCommand('kra-dev.calculateTax', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const amount = parseFloat(text.replace(/,/g, ''));

        if (isNaN(amount)) {
            vscode.window.showErrorMessage('Please select a numeric value to calculate KRA tax (16% VAT).');
            return;
        }

        const result = KRAHelper.calculate(amount);
        const output = `/* KRA Tax Summary */\n` +
                       `// Net Amount: ${result.net}\n` +
                       `// VAT (16%):   ${result.vat}\n` +
                       `// Gross Total: ${result.gross}\n` +
                       `// Calculated:  ${result.timestamp}`;

        editor.edit(editBuilder => {
            editBuilder.replace(selection, output);
        });
    });

    // Command 2: Insert eTIMS Payload Header Template
    let insertHeaderDisposable = vscode.commands.registerCommand('kra-dev.insertETimsHeader', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const header = {
            invoiceId: KRAHelper.generatePayloadId(),
            pinOfBuyer: "P000000000X",
            exemptionNumber: null,
            isTrainingMode: true,
            deviceSerial: "KRA001-DEVICE-TEST"
        };

        const snippet = new vscode.SnippetString(JSON.stringify(header, null, 4));
        editor.insertSnippet(snippet);
    });

    // Register Status Bar Item
    const kraStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    kraStatus.text = "$(shield) KRA Helper";
    kraStatus.tooltip = "KRA Dev Snippets: Tax & eTIMS Tools";
    kraStatus.command = 'kra-dev.calculateTax';
    kraStatus.show();

    context.subscriptions.push(calcTaxDisposable);
    context.subscriptions.push(insertHeaderDisposable);
    context.subscriptions.push(kraStatus);
}

/**
 * Deactivation logic
 */
function deactivate() {
    // Cleanup resources if necessary
}

module.exports = {
    activate,
    deactivate
};