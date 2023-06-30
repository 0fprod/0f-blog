import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { CodeInline } from './inline/InlineCode';
import { CodeBlock } from './block/BlockCode';

export const Code: keyof JSX.IntrinsicElements | CodeComponent = ({ inline, className, children }) => {
  return inline ? <CodeInline children={children} /> : <CodeBlock className={className} content={String(children)} />;
};
