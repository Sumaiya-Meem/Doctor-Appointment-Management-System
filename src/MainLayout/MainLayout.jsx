import { Outlet, useLocation} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location=useLocation();
  const noHeaderFooter =location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            {noHeaderFooter || <Header></Header>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
            
        </div>
    );
};

export default MainLayout;