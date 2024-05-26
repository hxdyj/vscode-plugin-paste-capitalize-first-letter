import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.pasteCapitalizeFirstLetter', async () => {
		// 获取剪切板内容
		const clipboardContent = await vscode.env.clipboard.readText();

		// 将首字母大写
		const capitalizedText = clipboardContent.replace(/\b\w/g, char => char.toUpperCase());

		// 将处理后的文本粘贴到光标位置
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, capitalizedText);
			});
		}
	});

	context.subscriptions.push(disposable);

	// 注册快捷键
	vscode.commands.registerCommand('extension.pasteCapitalizeFirstLetterBindAltV', () => {
		vscode.commands.executeCommand('extension.pasteCapitalizeFirstLetter');
	});
}

export function deactivate() { }
