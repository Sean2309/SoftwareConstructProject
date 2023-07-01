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
                        <Link to="transferPage">transferPage</Link>
                    </li>
                    <li>
                        <Link to="loyaltyPrograms">loyaltyPrograms</Link>
                    </li>

                </ul>

            </nav>
            <Outlet/>
        </>
    )
};

export default Layout;