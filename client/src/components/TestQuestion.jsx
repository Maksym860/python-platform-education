export default function TestQuestion({ question, index, selectedIndex, onSelect }) {
  return (
    <fieldset className="test-question">
      <legend className="test-question__legend">
        <span className="test-question__number">Питання {index + 1}</span>
        <span className="test-question__text">{question.question}</span>
      </legend>
      <div className="test-question__options">
        {question.options.map((option, optionIdx) => {
          const isSelected = selectedIndex === optionIdx;
          return (
            <label
              key={optionIdx}
              className={`test-option ${isSelected ? 'test-option--selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${index}`}
                checked={isSelected}
                onChange={() => onSelect(index, optionIdx)}
              />
              <span className="test-option__marker" aria-hidden="true" />
              <span className="test-option__label">{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
