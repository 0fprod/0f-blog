import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React, { ReactNode } from 'react';

interface CodeBlockProps {
  className?: string;
  content: ReactNode;
}

export const CodeBlock = ({ className, content }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');

  if (match === null) {
    return <React.Fragment />;
  }

  return (
    <SyntaxHighlighter
      children={String(content).replace(/\n$/, '')}
      language={match[1]}
      showLineNumbers={false}
      useInlineStyles={false}
      wrapLongLines={true}
    />
  );
};
