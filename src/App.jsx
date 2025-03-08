
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import ReadAllitems from './pages/item/ReadAllitems';
import ReadSingleItem from './pages/item/ReadSingleItem';
import CreateItem from './pages/item/CreateItem';
import UpdateItem from './pages/item/UpdateItem';
import DeleteItem from './pages/item/DeleteItem';

const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/user/register' element={<Register />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/' element={<ReadAllitems />} />
            <Route path='/item/:id' element={<ReadSingleItem />} />
            <Route path='/item/create' element={<CreateItem />} />
            <Route path='/item/update/:id' element={<UpdateItem />} />
            <Route path='/item/delete/:id' element={<DeleteItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;