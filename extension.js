const vscode = require('vscode');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function getApiKey() {
    const storedApiKey = vscode.workspace.getConfiguration().get('pythonToCpp.apiKey');
    if (storedApiKey) {
        return storedApiKey;
    }

    const apiKey = await vscode.window.showInputBox({
        prompt: 'Please enter your Google Gemini API key',
        placeHolder: 'Enter API Key',
        password: true,
    });

    if (apiKey) {
        await vscode.workspace.getConfiguration().update('pythonToCpp.apiKey', apiKey, vscode.ConfigurationTarget.Workspace);
        return apiKey;
    } else {
        throw new Error('API Key is required for this extension');
    }
}

async function convertPythonToCpp(pythonCode, apiKey) {
    try {
        const client = new GoogleGenerativeAI(apiKey);
        const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            `Convert this Python code to C++:\n${pythonCode} using <bits/stdc++.h> and don't send any text other than code itself`
        ]);

        let ans = result.response.text().slice(7, -1);
        while (! ans.endsWith("}")){
            ans = ans.slice(0, -1);
        }
        return ans;
    } catch (error) {
        throw new Error(`API Request Failed: ${error.message}`);
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Your "python-to-cpp" extension is now active!');

    let disposable = vscode.commands.registerCommand('extension.convertPythonToCpp', async function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const pythonCode = editor.document.getText();
            try {
                const apiKey = await getApiKey();

                const cppCode = await convertPythonToCpp(pythonCode, apiKey);

                const doc = await vscode.workspace.openTextDocument({ language: 'cpp', content: cppCode });
                vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
            } catch (error) {
                vscode.window.showErrorMessage(`Conversion failed: ${error.message}`);
            }
        } else {
            vscode.window.showErrorMessage("No active editor found.");
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
