const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
// async function convertPythonToCpp(pythonCode) {

//     try {
//         // Request to Gemini via Google AI Generative API
//         const result = await model.generateContent([
//             `Convert this Python code to C++:\n${pythonCode}`
//         ]);

//         // Assuming the response contains the C++ code
//         return result.response.text();
//     } catch (error) {
//         throw new Error(`API Request Failed: ${error.message}`);
//     }
// }

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {
//     console.log('Your "python-to-cpp" extension is now active!');

//     // Create a command to toggle the conversion
//     let disposable = vscode.commands.registerCommand('extension.convertPythonToCpp', async function () {
//         const editor = vscode.window.activeTextEditor;
//         if (editor) {
//             const pythonCode = editor.document.getText();

//             try {
//                 // Convert Python to C++ using Google Generative AI Client
//                 const cppCode = await convertPythonToCpp(pythonCode);
//                 console.log(cppCode)
//                 // Show the C++ code in a new editor tab
//                 const doc = await vscode.workspace.openTextDocument({ language: 'cpp', content: cppCode });
//                 vscode.window.showTextDocument(doc, vscode.ViewColumn.Beside);
//             } catch (error) {
//                 vscode.window.showErrorMessage(`Conversion failed: ${error.message}`);
//             }
//         } else {
//             vscode.window.showErrorMessage("No active editor found.");
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// function deactivate() {}

// module.exports = {
//     activate,
//     deactivate
// };
