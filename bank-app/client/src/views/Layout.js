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
<<<<<<< HEAD
                        <Link to="marketplace">Marketplace</Link>
                    </li>

=======
                        <Link to="transferPage">transferPage</Link>
                    </li>
>>>>>>> 31fde4fdfac46053a7b5371bfe36a0a9852f4368
                </ul>

            </nav>
            <Outlet/>
        </>
    )
};

export default Layout;