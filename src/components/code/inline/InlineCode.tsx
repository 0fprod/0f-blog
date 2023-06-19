import { ReactNode } from 'react';

interface CodeInlineProps {
  children: ReactNode;
  className?: string;
}

export const CodeInline = ({ children, className }: CodeInlineProps) => {
  return <code className={className}>{children}</code>;
};
