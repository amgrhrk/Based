const leftPanel = {
	self: document.querySelector('.panel'),
	textarea: document.getElementById('original')
}
const rightPanel = {
	self: document.querySelectorAll('.panel')[1],
	textarea: document.getElementById('encoded')
}
const defaultHeight = leftPanel.textarea.scrollHeight
const state = {
	ENCODING: 0,
	DECODING: 1,
	current: 0,
	typing: false
}

async function encode() {
	state.current = state.ENCODING
	try {
		const resultCompressed = await Based.encode(leftPanel.textarea.value, true)
		const resultUncompressed = await Based.encode(leftPanel.textarea.value, false)
		if (resultCompressed.length < resultUncompressed.length - 1) {
			rightPanel.textarea.value = resultCompressed + Based.alphabet[Math.floor(Math.random() * Based.alphabet.length)]
		} else {
			rightPanel.textarea.value = resultUncompressed
		}
	} catch (err) {
		const resultUncompressed = await Based.encode(leftPanel.textarea.value, false)
		rightPanel.textarea.value = resultUncompressed
	}
}
async function decode() {
	state.current = state.DECODING
	try {
		leftPanel.textarea.value = await Based.decode(rightPanel.textarea.value.trim(), leftPanel.textarea.value.length % 4 !== 0)
	} catch (err) {}
}
function resize() {
	leftPanel.textarea.style.height = defaultHeight + 'px'
	rightPanel.textarea.style.height = defaultHeight + 'px'
	if (window.getComputedStyle(document.querySelector('.main')).flexDirection === 'row') {
		const height = Math.max(leftPanel.textarea.scrollHeight, rightPanel.textarea.scrollHeight)
		leftPanel.textarea.style.height = height + 'px'
		rightPanel.textarea.style.height = height + 'px'
	} else {
		leftPanel.textarea.style.height = leftPanel.textarea.scrollHeight + 'px'
		rightPanel.textarea.style.height = rightPanel.textarea.scrollHeight + 'px'
	}
}

leftPanel.textarea.addEventListener('compositionstart', () => {
	state.typing = true
})
rightPanel.textarea.addEventListener('compositionstart', () => {
	state.typing = true
})
leftPanel.textarea.addEventListener('compositionend', async () => {
	state.typing = false
	await encode()
	resize()
})
rightPanel.textarea.addEventListener('compositionend', async () => {
	state.typing = false
	await decode()
	resize()
})

leftPanel.textarea.addEventListener('input', async () => {
	if (state.typing) {
		return
	}
	await encode()
	resize()
})
rightPanel.textarea.addEventListener('input', async () => {
	if (state.typing) {
		return
	}
	await decode()
	resize()
})
window.addEventListener('resize', resize)