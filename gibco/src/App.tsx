import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './components/Editor';
import Home from './components/Home';


function App() {


  return (
    <Router>
    <div>
      <Routes>
        
        
       <Route path='/' element={<Home />}/> 
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
