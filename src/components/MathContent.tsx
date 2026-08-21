import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathContentProps {
  text: string;
  className?: string;
}

const LATEX_SEGMENT = /\$([^$]+)\$/g;

/** Renders text containing inline $...$ LaTeX segments via katex, plain text otherwise. */
export function MathContent({ text, className }: MathContentProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.replaceChildren();

    let lastIndex = 0;
    LATEX_SEGMENT.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = LATEX_SEGMENT.exec(text))) {
      if (match.index > lastIndex) {
        node.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const span = document.createElement('span');
      try {
        katex.render(match[1], span, { throwOnError: false });
      } catch {
        span.textContent = match[1];
      }
      node.appendChild(span);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      node.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }, [text]);

  return <span ref={ref} className={className} />;
}
