import { BrowserRouter, Switch } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Index from "./pages/index";
import NotFound from "./pages/404";
import Management from "./pages/management/index";
import Mapa from "./pages/management/vehicular/[id]";
import Report from "./pages/report/index";
import Administration from "./pages/administration/index";
import CreateDriver from "./pages/administration/create-driver";
import EditDriver from "./pages/administration/edit-driver/[id]";
import { AuthRoute, LogRoute } from "./components/Auth/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/" exact component={Index} />
        <AuthRoute path="/management/vehicular/:id" exact component={Mapa} />
        <AuthRoute path="/management" exact component={Management} />
        <AuthRoute path="/report" exact component={Report} />
        <AuthRoute path="/administration" exact component={Administration} />
        <AuthRoute
          path="/administration/create-driver"
          exact
          component={CreateDriver}
        />
        <AuthRoute
          path="/administration/edit-driver/:id"
          exact
          component={EditDriver}
        />
        <LogRoute path="/signin" exact component={Signin} />
        <LogRoute path="/signup" exact component={Signup} />
        <AuthRoute component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
