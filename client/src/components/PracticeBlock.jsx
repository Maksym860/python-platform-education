import { useState } from 'react';
import CodeBlock from './CodeBlock.jsx';

function PracticeTask({ task, index }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="practice-task">
      <div className="practice-task__header">
        <span className="practice-task__number">Завдання {index + 1}</span>
        <h4 className="practice-task__title">{task.title}</h4>
      </div>
      <p className="practice-task__instructions">{task.instructions}</p>

      {task.starterCode && (
        <CodeBlock code={task.starterCode} caption="Заготовка коду" />
      )}

      {task.hint && (
        <p className="practice-task__hint">
          <span className="practice-task__hint-label">Підказка</span> {task.hint}
        </p>
      )}

      {!revealed ? (
        <button type="button" className="btn btn--ghost btn--small" onClick={() => setRevealed(true)}>
          Показати розв'язок
        </button>
      ) : (
        <div className="practice-task__solution">
          <CodeBlock code={task.solutionCode} caption="Розв'язок" output={task.expectedOutput} />
          <button type="button" className="btn btn--ghost btn--small" onClick={() => setRevealed(false)}>
            Сховати розв'язок
          </button>
        </div>
      )}
    </div>
  );
}

export default function PracticeBlock({ practice }) {
  if (!practice) return null;

  return (
    <section className="practice-section">
      <div className="practice-section__header">
        <span className="practice-section__badge">Практика</span>
        <h2>Спробуй сам</h2>
        <p>{practice.intro}</p>
      </div>
      <div className="practice-section__tasks">
        {practice.tasks.map((task, idx) => (
          <PracticeTask key={idx} task={task} index={idx} />
        ))}
      </div>
    </section>
  );
}
