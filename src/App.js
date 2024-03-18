import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList/ContactList';
import EditContact from './Components/Contacts/EditContact/EditContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import AddContact from './Components/Contacts/AddContact/AddContact';
import NavBar from './Components/NavCompo/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
        <React.Fragment>
          <Routes>
            <Route path='/' element={<Navigate to={'contact/list'}/>}/>
            <Route path='/contact/list' element={<ContactList/>}/>
            <Route path='/contact/add' element={<AddContact/>}/>
            <Route path='/contact/edit/:contactID' element={<EditContact/>}/>
            <Route path='/contact/view/:contactID' element={<ViewContact/>}/>
          </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
