import "./App.css";
import React , {useState} from 'react';
import EmpList from "./component/EmpList/EmpList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/UI/Header/Header";
import Register from "./component/Register/Register";
import AddUser from "./component/AddUser/AddUser";
import Search from './component/UI/Search/Search';
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
            <EmpList userArray={userArray} setUserArray={setUserArray} mount={mount} setMount={setMount}/>
          </Route>
          <Route path='/Register' component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
