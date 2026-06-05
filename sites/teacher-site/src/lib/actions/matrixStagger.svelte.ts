import type { Action } from 'svelte/action';
import { animate, stagger } from 'motion';

export interface StaggerOptions {
	delay?: number;
	duration?: number;
	intervalSpeed?: number;
	fontSize?: string;
}

const matrixSymbols: string[] = ["$", "{", "+", "[", "~", "•", "`", "^", "@", "]", "}", "="];

const staggerText: Action<HTMLElement, StaggerOptions | undefined> = (
	node: HTMLElement, 
	options: StaggerOptions = {}
) => {
	const {
		delay = 0.05,
		duration = 0.3,
		intervalSpeed = 80
	} = options;

	// Automatically map to your design tokens if no manual fontSize is passed
	const tagName = node.tagName.toLowerCase();
	const sizeMapping: Record<string, string> = {
		'h1': 'var(--font-size-1)',
		'h2': 'var(--font-size-2)',
		'h3': 'var(--font-size-3)',
		'h4': 'var(--font-size-4)'
	};

	const runtimeFontSize = options.fontSize || sizeMapping[tagName] || 'inherit';

	// Clean up container typography without forcing flex-jail
	Object.assign(node.style, {
		fontSize: runtimeFontSize,
		fontFamily: 'monospace',
		userSelect: 'none',
		display: 'block' 
	});

	const originalText: string = node.textContent ?? "";
	const words: string[] = originalText.split(" ");
	
	node.innerHTML = '';
	
	words.forEach((word, wordIndex) => {
		const wordBox = document.createElement('span');
		wordBox.style.display = 'inline-block';
		wordBox.style.whiteSpace = 'nowrap'; 

		const letters = word.split("");

		letters.forEach((char, index) => {
			const charBox = document.createElement('span');
			charBox.className = 'char-box'; 
			
			Object.assign(charBox.style, {
				position: 'relative',
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '0.85em', 
				height: '1.2em',
				verticalAlign: 'bottom',
				willChange: 'transform, opacity'
			});

			const shapeLayer = document.createElement('div');
			Object.assign(shapeLayer.style, {
				position: 'absolute',
				inset: '0',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				opacity: '0',
				transform: 'scale(0.7)',
				zIndex: '0'
			});
			
			if (index % 3 === 0) {
				shapeLayer.innerHTML = `<div style="width: 100%; height: 80%; background-color: currentColor; border-radius: 2px;"></div>`;
			} else if (index % 2 === 0) {
				shapeLayer.innerHTML = `<div style="width: 80%; height: 80%; border: 2px solid currentColor; border-radius: 2px; box-sizing: border-box;"></div>`;
			} else {
				shapeLayer.innerHTML = `<div style="font-size: 0.35em; letter-spacing: -1px; line-height: 1; color: #a1a1aa; overflow: hidden; opacity: 0.6;">••••<br>••••<br>••••</div>`;
			}
			charBox.appendChild(shapeLayer);

			const scrambler = document.createElement('span');
			scrambler.className = 'scrambler';
			scrambler.setAttribute('data-char', char);
			scrambler.textContent = char;
			Object.assign(scrambler.style, {
				position: 'relative',
				zIndex: '10',
				display: 'block',
				width: '100%',
				textAlign: 'center',
				opacity: '0'
			});
			
			charBox.appendChild(scrambler);
			wordBox.appendChild(charBox);
		});

		node.appendChild(wordBox);

		if (wordIndex < words.length - 1) {
			const spaceBox = document.createElement('span');
			spaceBox.className = 'char-box';
			spaceBox.innerHTML = '&nbsp;';
			Object.assign(spaceBox.style, {
				display: 'inline-block',
				width: '0.4em'
			});
			node.appendChild(spaceBox);
		}
	});

	const boxes = node.querySelectorAll<HTMLElement>('.char-box');
	animate(
		boxes,
		{ transform: ["translateY(15px)", "translateY(0px)"] },
		{ delay: stagger(delay), duration: duration, easing: [0.19, 1, 0.22, 1] }
	);

	const systemBoxes = node.querySelectorAll<HTMLElement>('.char-box');
	let frameCounter = 0;

	const glitchInterval = setInterval(() => {
		frameCounter++;

		systemBoxes.forEach((box, idx) => {
			const scrambler = box.querySelector<HTMLElement>('.scrambler');
			const shapeLayer = box.querySelector<HTMLElement>('div');
			if (!scrambler || !shapeLayer) return;

			const original = scrambler.getAttribute('data-char') ?? "";
			const lockThreshold = idx * 2; 
			
			if (frameCounter < lockThreshold) {
				scrambler.style.opacity = Math.random() > 0.4 ? '1' : '0';
				scrambler.textContent = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
				
				if (Math.random() > 0.5) {
					shapeLayer.style.opacity = '1';
					shapeLayer.style.transform = `scale(${Math.random() * 0.4 + 0.8})`;
				} else {
					shapeLayer.style.opacity = '0';
				}
			} else if (frameCounter < lockThreshold + 4) {
				shapeLayer.style.opacity = '0';
				scrambler.style.opacity = '1';
				if (Math.random() > 0.7) {
					scrambler.textContent = original;
				} else {
					scrambler.textContent = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
				}
			} else {
				scrambler.textContent = original;
				scrambler.style.opacity = '1';
				shapeLayer.style.opacity = '0';
			}
		});

		if (frameCounter > systemBoxes.length * 2 + 6) {
			clearInterval(glitchInterval);
		}
	}, intervalSpeed);

	return {
		destroy() {
			clearInterval(glitchInterval);
		}
	};
};

export default staggerText;