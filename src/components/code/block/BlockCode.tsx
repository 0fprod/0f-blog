import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React, { useEffect, ReactNode } from 'react';

interface CodeBlockProps {
  className?: string;
  content: ReactNode;
}

export const CodeBlock = ({ className, content }: CodeBlockProps) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted && window.matchMedia('(prefers-color-scheme: dark)').matches ? oneDark : oneLight;
  const match = /language-(\w+)/.exec(className || '');

  if (match === null) {
    return <React.Fragment />;
  }

  return <SyntaxHighlighter children={String(content).replace(/\n$/, '')} style={theme} language={match[1]} />;
};
