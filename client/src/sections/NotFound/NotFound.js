import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    The place you're looking for....is not here.
    <Link to="/">Back to somewhere else!</Link>
  </div>
);

export default NotFound;
