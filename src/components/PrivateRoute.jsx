import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading || user === undefined) {
        // Block UI until user is either confirmed or denied
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h4>Checking authentication...</h4>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
