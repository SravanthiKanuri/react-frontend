import 'bootstrap/dist/css/bootstrap.min.css';
//import react from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/Login';
import HomePage from './Pages/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import SignupPage from './Pages/SignUp/Signup';
import About from './components/About/About';
//import Contact from './components/Caontact/Contact';
import FrontPage from './Pages/FrontPage/FrontPage'
import AuthPage from './ProtectedRoutes/Auth';
import Company from './components/AboutCompany/AboutCompany';
import Jobs from './components/Jobs/Jobs'
import './App.css';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import AddedJobs from './components/AddedJobs/AddedJobs'
import Practice from './components/Practice/Practice';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />}>
            <Route index element={<Company />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='practice' element={<Practice />} />
             <Route path='*' element={<PageNotFound />} /> 
          </Route>



          <Route element={<AuthPage />}>

            <Route path='/home' element={<HomePage />}>
                <Route index element={<Dashboard />} />
                <Route path='about' element={<About />} />
                <Route path='about/:id' element={<About />} />
                <Route path='jobs' element={<Jobs />} />
                {/* <Route path='addedjobs' element={<AddedJobs />} /> */}
                <Route path='addedjobs' element={<AddedJobs />} />
                
            </Route>
            
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;