import { Outlet, Link} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="Login">Login Page</Link>
                    </li>
                </ul>

            </nav>
            <Outlet/>
        </>
    )
};

export default Layout;