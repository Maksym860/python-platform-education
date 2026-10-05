export default function CodeBlock({ code, caption, output }) {
  return (
    <div className="code-block">
      <div className="code-block__chrome">
        <span className="code-block__dot code-block__dot--red" />
        <span className="code-block__dot code-block__dot--yellow" />
        <span className="code-block__dot code-block__dot--green" />
        {caption && <span className="code-block__caption">{caption}</span>}
      </div>
      <pre className="code-block__body">
        <code>{code}</code>
      </pre>
      {output && (
        <div className="code-block__output">
          <span className="code-block__output-label">Вивід</span>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
