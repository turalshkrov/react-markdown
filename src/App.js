import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import emoji from "remark-emoji";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import './App.css';

export default function App() {

  const placeholder = `# React Markdown

## This is a sub-heading
---
Heres some code, \`inline code\` between 2 backticks.

~~~js
const txt = "Hello World";
console.log(txt);
~~~


You can also make text **bold**... whoa!\n
Or _italic_.\n
Or... wait for it... **_both!_**\n
And feel free to go crazy ~~crossing stuff out~~.

This is a [link](https://www.freecodecamp.org)
> Block Quotes!

| Table | Header |
| ----- | ------ |
| First | Second |
| Third | Fourth |

![Test Icon](https://picsum.photos/536/354)
---
- [X] Checked Item
- [ ] Unchecked Item

1. Ordered Item
2. Ordered Item

- Unordered Item
  - Indented Item
---
Emoji :heart:

Text with a Footnote.[^1]

[^1]: This is the Footnote.
`;

  const [ text, setText ] =  useState(placeholder);
  const handleChange = (e) => setText(e.target.value);

  return (
    <div className="App">
      <div className='title'>
        <p>React Markdown Preview by <a 
        href='https://github.com/turalshkrov'
        target='_blank' 
        rel="noreferrer">
          turalshkrov
        </a></p>
      </div>
      <div className='container'>
        <div id='editor'>
          <div className='topbar'>
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>Editor</p>
          </div>
          <textarea
          cols={40}
          rows={50}
          onChange={handleChange}
          value={text}/>
        </div>

        <div id='preview'>
          <div className='topbar'>
            <FontAwesomeIcon icon={faEye} />
            <p>Preview</p>
          </div>
          <div 
            className='preview-content'>
            <ReactMarkdown
            remarkPlugins={[remarkGfm, emoji]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ?
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={coldarkCold}
                    PreTag="div"
                    {...props}
                  /> :
                  <code className={className} {...props}>
                    {children}
                  </code>
              }
            }}
            children={text}/>
          </div>
        </div>
      </div>
    </div>
  );
}

