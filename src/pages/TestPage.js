import React from 'react'
import {TodoList} from "../components/test"

function TestPage() {
    document.title = "Noteshelf -  Mein Test"

  return (
    <div>
      <TodoList/>
    </div>
  );
}

export default TestPage;