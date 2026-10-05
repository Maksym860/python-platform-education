import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ModulesCatalogPage from './pages/ModulesCatalogPage.jsx';
import ModulePage from './pages/ModulePage.jsx';
import LessonPage from './pages/LessonPage.jsx';
import TestPage from './pages/TestPage.jsx';
import TestResultPage from './pages/TestResultPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/modules" element={<ModulesCatalogPage />} />
        <Route path="/modules/:moduleId" element={<ModulePage />} />
        <Route path="/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/lessons/:lessonId/test" element={<TestPage />} />
        <Route path="/lessons/:lessonId/result" element={<TestResultPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
