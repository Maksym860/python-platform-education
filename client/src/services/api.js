const BASE_URL = '/api';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Помилка запиту: ${res.status}`);
  }
  return res.json();
}

async function post(path, data) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Помилка запиту: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getCourses: () => request('/courses'),
  getCourse: (id) => request(`/courses/${id}`),
  getModules: (courseId) => request(`/modules${courseId ? `?courseId=${courseId}` : ''}`),
  getModule: (id) => request(`/modules/${id}`),
  getModuleLessons: (moduleId) => request(`/modules/${moduleId}/lessons`),
  getLesson: (id) => request(`/lessons/${id}`),
  getLessonTheory: (lessonId) => request(`/lessons/${lessonId}/theory`),
  getLessonPractice: (lessonId) => request(`/lessons/${lessonId}/practice`),
  getLessonTest: (lessonId) => request(`/lessons/${lessonId}/tests`),
  submitLessonTest: (lessonId, answers) => post(`/lessons/${lessonId}/tests/check`, { answers })
};
