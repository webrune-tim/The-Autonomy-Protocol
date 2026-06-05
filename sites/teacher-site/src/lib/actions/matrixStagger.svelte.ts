import type { Action } from 'svelte/action';
import { animate, stagger } from 'motion';

export interface StaggerOptions {
  delay?: number;
  duration?: number;
  intervalSpeed?: number;
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

  const originalText: string = node.textContent ?? "";
  const letters: string[] = originalText.split("");
  
  node.innerHTML = '';
  
  // CRITICAL FIX: Use inline styles to bypass Tailwind JIT purging
  Object.assign(node.style, {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontFamily: 'monospace',
    userSelect: 'none'
  });

  letters.forEach((char, index) => {
    const charBox = document.createElement('div');
    charBox.className = 'char-box'; // Kept purely for motion.dev target selection
    
    // Handle space characters
    if (char === " ") {
      Object.assign(charBox.style, {
        width: '0.5em',
        height: '1.2em',
        display: 'inline-block'
      });
      node.appendChild(charBox);
      return;
    }

    // Force rigid sizing for characters
    Object.assign(charBox.style, {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '0.8em',
      height: '1.2em',
      overflow: 'visible',
      textAlign: 'center',
      willChange: 'transform, opacity'
    });

    // 1. Background Graphic Layer (Solid squares, wireframes, dots)
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
    
    // We use currentColor so the shapes match whatever text color your h1/h2 is
    if (index % 3 === 0) {
      shapeLayer.innerHTML = `<div style="width: 100%; height: 80%; background-color: currentColor; border-radius: 2px;"></div>`;
    } else if (index % 2 === 0) {
      shapeLayer.innerHTML = `<div style="width: 80%; height: 80%; border: 2px solid currentColor; border-radius: 2px; box-sizing: border-box;"></div>`;
    } else {
      shapeLayer.innerHTML = `<div style="font-size: 10px; letter-spacing: -1px; line-height: 1; color: #a1a1aa; overflow: hidden;">••••<br>••••<br>••••</div>`;
    }
    charBox.appendChild(shapeLayer);

    // 2. Foreground Character Layer
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
    node.appendChild(charBox);
  });

  // Entry Animations via Motion.dev
  const boxes = node.querySelectorAll<HTMLElement>('.char-box');
  animate(
    boxes,
    { transform: ["translateY(15px)", "translateY(0px)"] },
    { 
      delay: stagger(delay), 
      duration: duration, 
      easing: [0.19, 1, 0.22, 1] 
    }
  );

  // Scramble State Orchestration Loop
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