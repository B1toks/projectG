// page.tsx або App.tsx (батьківський компонент або точка входу)
import React from "react";
import TopicPage from "./[topicId]/page";

export default function Page() {
  return (
    <>
      {/* Перевірка для викладача */}
      <TopicPage isTeacher={true} />

      {/* Перевірка для студента */}
      {/* <TopicPage isTeacher={false} /> */}
    </>
  );
}
