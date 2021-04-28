import "./App.css";
import React , {useState} from 'react';
import EmpList from "./component/EmpList/EmpList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/UI/Header/Header";
import Register from "./component/Register/Register";
import AddUser from "./component/AddUser/AddUser";
import Search from './component/UI/Search/Search';
import SignUp from './component/SignUp/SignUp';
import SignIn from './component/SignIn/SignIn';
function App() {
  const [userArray, setUserArray] = useState([]);
  const [mount, setMount] = useState(false);
  return (
    <Router>
      <div>
       
        <Switch>
          <Route path='/' exact>
       
            <Header>
              <Search userArray={userArray} setUserArray={setUserArray} setMount={setMount} />
              <AddUser />
            </Header>
            <div className="body">
            <EmpList userArray={userArray} setUserArray={setUserArray} mount={mount} setMount={setMount}/>
        </div>
          
          </Route>
          <Route path='/login' component={SignIn} />
          <Route path='/register' component={SignUp} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
