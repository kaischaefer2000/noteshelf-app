import React from 'react'
import {TodoList} from "../components/test"

function TestPage() {
    document.title = "Thought Collector -  Mein Test"

  return (
    <div>
      <TodoList/>
    </div>
  );
}

export default TestPage;