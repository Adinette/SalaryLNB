<script lang="ts" setup>
	import { Heading } from "@tiptap/extension-heading";
	import { Highlight } from "@tiptap/extension-highlight";
	import { TextAlign } from "@tiptap/extension-text-align";
	import { Placeholder } from "@tiptap/extension-placeholder";
	import { Bold } from "@tiptap/extension-bold";
	import { Italic } from "@tiptap/extension-italic";

	import { Editor, EditorContent } from "../tiptap/vue-3";

	const props = defineProps<{
		label?: string;
		content?: string;
	}>();

	const emit = defineEmits<{
		(e: "update:text", value: string): void;
	}>();

	const label = props.label || "Texte";
	const content = ref<string>(props.content || "");

	watchEffect(() => {
		emit("update:text", content.value);
	});

	const currentEditor = new Editor({
		extensions: [
			Heading,
			Bold,
			Italic,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Highlight,
			Placeholder.configure({
				placeholder: "Saisissez du texte ...",
				emptyEditorClass: "is-editor-empty",
			}),
		],
		content: content.value,
		onUpdate: ({ editor }) => {
			content.value = editor.getHTML();
		},
	});
</script>

<template>
	<div v-if="currentEditor" class="container">
		<div class="flex justify-space-between">
			<div class="form-label">
				{{ label }}
			</div>
			<div class="mt-5">
				<VBtn
					icon="mdi-format-title"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive('heading', { level: 1 }) ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().toggleHeading({ level: 1 }).run()"
				/>
				<VBtn
					icon="mdi-format-align-left"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive({ textAlign: 'left' }) ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().setTextAlign('left').run()"
				/>
				<VBtn
					icon="mdi-format-align-center"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive({ textAlign: 'center' }) ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().setTextAlign('center').run()"
				/>
				<VBtn
					icon="mdi-format-align-right"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive({ textAlign: 'right' }) ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().setTextAlign('right').run()"
				/>
				<VBtn
					icon="mdi-format-align-justify"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive({ textAlign: 'justify' }) ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().setTextAlign('justify').run()"
				/>
				<VBtn
					icon="mdi-format-bold"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive('bold') ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().toggleBold().run()"
				/>
				<VBtn
					icon="mdi-format-italic"
					:rounded="0"
					size="x-small"
					:variant="currentEditor.isActive('italic') ? 'flat' : 'tonal'"
					@click="currentEditor.chain().focus().toggleItalic().run()"
				/>
			</div>
		</div>
		<EditorContent v-model="content" :editor="currentEditor" />
	</div>
</template>

<style lang="scss">
	/* Basic editor styles */
	.ProseMirror {
		overflow: hidden;
		border: 1px solid lightgray;
		border-radius: 5px;
		color: black;
		max-block-size: 400px;
		overflow-y: scroll;
	}

	.ProseMirror:focus {
		outline: none;
	}

	.tiptap p.is-editor-empty:first-child::before {
		block-size: 0;
		color: #adb5bd;
		content: attr(data-placeholder);
		float: inline-start;
		pointer-events: none;
	}

	.tiptap {
		padding-block: 10px;
		padding-inline: 10px;

		:first-child {
			margin-block-start: 0;
		}

		/* List styles */
		ul,
		ol {
			margin-block: 1.25rem;
			margin-inline: 1rem;
			padding-block: 0 1rem;

			li p {
				margin-block: 0.25em;
			}
		}

		/* Heading styles */
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			line-height: 1.1;
			margin-block-start: 2.5rem;
			text-wrap: pretty;
		}

		h1,
		h2 {
			margin-block-end: 1.5rem;
			margin-block-start: 3.5rem;
		}

		h1 {
			font-size: 1.4rem;
		}

		h2 {
			font-size: 1.2rem;
		}

		h3 {
			font-size: 1.1rem;
		}

		h4,
		h5,
		h6 {
			font-size: 1rem;
		}

		/* Code and preformatted text styles */
		code {
			border-radius: 0.4rem;
			background-color: var(--purple-light);
			color: var(--black);
			font-size: 0.85rem;
			padding-block: 0.25em;
			padding-inline: 0.3em;
		}

		pre {
			border-radius: 0.5rem;
			background: var(--black);
			color: var(--white);
			font-family: JetBrainsMono, monospace;
			margin-block: 1.5rem;
			padding-block: 0.75rem;
			padding-inline: 1rem;

			code {
				background: none;
				color: inherit;
				font-size: 0.8rem;
				padding-block: 0;
			}
		}

		mark {
			border-radius: 0.4rem;
			/* stylelint-disable-next-line color-hex-case */
			background-color: #faf594;
			box-decoration-break: clone;
			padding-block: 0.1rem;
			padding-inline: 0.3rem;
		}

		blockquote {
			border-inline-start: 3px solid var(--gray-3);
			margin-block: 1.5rem;
			padding-inline-start: 1rem;
		}

		hr {
			border: none;
			border-block-start: 1px solid var(--gray-2);
			margin-block: 2rem;
		}
	}
</style>
