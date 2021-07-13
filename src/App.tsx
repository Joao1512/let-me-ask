import { Home } from './pages/Home'
import { Room } from './pages/Room';
import { NewRoom } from './pages/NewRoom';
import { AdminRoom } from './pages/AdminRoom';
import { AuthContextProvide } from './contexts/AuthContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom'



function App() {

  return (
    <BrowserRouter>
      <AuthContextProvide>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/rooms/new' exact component={NewRoom}></Route>
          <Route path='/rooms/:id' component={Room}></Route>
          <Route path='/admin/rooms/:id' component={AdminRoom}></Route>
        </Switch>
      </AuthContextProvide>
    </BrowserRouter>
  );
}

export default App;
