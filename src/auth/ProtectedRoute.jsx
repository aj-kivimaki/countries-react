import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";

const ProtectedRoute = ({ component }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) <div>Loading...</div>;

  return user ? component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
