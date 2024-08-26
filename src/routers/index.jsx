import { HashRouter as Router } from "react-router-dom";
import UserRoutes from "./user";

const Routers = () => {
  return (
    <Router>
      <UserRoutes />
    </Router>
  );
};

export default Routers;
