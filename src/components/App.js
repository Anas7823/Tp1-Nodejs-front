import React from 'react';
import Commentaire from './Commentaire.js';
import User from './User.js';
import Technologie from './Technologie.js';

import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return(
    
    <div>

      <Routes>
      <Route path='/technologie/:id' element={<Technologie />} />

        <Route path='/commentaire' element={<Commentaire/>}>
        </Route>

        <Route path="/"element={<User/>}>
        </Route>
      </Routes>
</div>
  )

}

export default App;
