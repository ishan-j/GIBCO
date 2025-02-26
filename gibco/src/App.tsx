import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './components/Editor';


function App() {


  return (
    <Router>
    <div>
      <Routes>
        
        
        {/* Editor Route */}
        <Route path="/" element={<Editor />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
