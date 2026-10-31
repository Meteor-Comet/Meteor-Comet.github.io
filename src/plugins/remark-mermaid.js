import { visit } from "unist-util-visit";

function escapeHtml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function remarkMermaid() {
	return (tree) => {
		visit(tree, "code", (node, index, parent) => {
			if (node.lang && node.lang.toLowerCase() === "mermaid") {
				const escapedCode = escapeHtml(node.value);
				parent.children[index] = {
					type: "html",
					value: `<div class="mermaid-wrapper my-6 flex justify-center overflow-x-auto"><pre class="mermaid text-center" data-code="${escapedCode}">${escapedCode}</pre></div>`,
				};
			}
		});
	};
}
