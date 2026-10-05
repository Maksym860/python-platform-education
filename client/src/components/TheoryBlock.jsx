import CodeBlock from './CodeBlock.jsx';

export default function TheoryBlock({ block }) {
  return (
    <section className="theory-block">
      <h3 className="theory-block__heading">{block.heading}</h3>
      <p className="theory-block__text">{block.text}</p>
      {block.codeExamples?.length > 0 && (
        <div className="theory-block__examples">
          {block.codeExamples.map((example, idx) => (
            <CodeBlock key={idx} code={example.code} caption={example.caption} output={example.output} />
          ))}
        </div>
      )}
    </section>
  );
}
