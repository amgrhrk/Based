const leftPanel = {
	self: document.querySelector('.panel'),
	textarea: document.getElementById('original')
}
const rightPanel = {
	self: document.querySelectorAll('.panel')[1],
	textarea: document.getElementById('encoded')
}
const defaultHeight = original.scrollHeight
let isTyping = false

async function encode() {
	rightPanel.textarea.value = await Based.encode(leftPanel.textarea.value)
}
async function decode() {
	try {
		leftPanel.textarea.value = await Based.decode(rightPanel.textarea.value)
	} catch (err) {}
}
function resize() {
	leftPanel.textarea.style.height = defaultHeight + 'px'
	rightPanel.textarea.style.height = defaultHeight + 'px'
	const height = Math.max(leftPanel.textarea.scrollHeight, rightPanel.textarea.scrollHeight)
	leftPanel.textarea.style.height = height + 'px'
	rightPanel.textarea.style.height = height + 'px'
}

leftPanel.textarea.addEventListener('compositionstart', () => {
	isTyping = true
})
rightPanel.textarea.addEventListener('compositionstart', () => {
	isTyping = true
})
leftPanel.textarea.addEventListener('compositionend', async () => {
	isTyping = false
	await encode()
	resize()
})
rightPanel.textarea.addEventListener('compositionend', async () => {
	isTyping = false
	await decode()
	resize()
})

leftPanel.textarea.addEventListener('input', async () => {
	if (isTyping) {
		return
	}
	await encode()
	resize()
})
rightPanel.textarea.addEventListener('input', async () => {
	if (isTyping) {
		return
	}
	await decode()
	resize()
})