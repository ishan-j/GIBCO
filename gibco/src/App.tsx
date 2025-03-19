import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './components/Editor';
import Home from './components/Home';
import PageSelection from './components/PageSelection';
import PageCreation from './components/PageCreation';
import DynamicPage from './components/dynamicComponents/DynamicPage';


function App() {


  return (
    <Router>
    <div>
      <Routes>
        
        
       <Route path='/' element={<Home />}/> 
        <Route path="/editor" element={<Editor />} />
        <Route path='/page' element={<PageSelection />}/> 
        <Route path='/createpage' element={<PageCreation />}/> 
        <Route path='/dynamicPage/:pageid' element={<DynamicPage/>}/> 
      </Routes>
    </div>
  </Router>
  )
}

export default App
