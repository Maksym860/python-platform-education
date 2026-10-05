import { Link } from 'react-router-dom';

export default function LessonListItem({ lesson, index }) {
  return (
    <Link to={`/lessons/${lesson._id}`} className="lesson-item">
      <span className="lesson-item__number">{index + 1}</span>
      <span className="lesson-item__content">
        <span className="lesson-item__title">{lesson.title}</span>
        {lesson.description && <span className="lesson-item__description">{lesson.description}</span>}
      </span>
      <span className="lesson-item__time">{lesson.estimatedMinutes} хв</span>
    </Link>
  );
}
