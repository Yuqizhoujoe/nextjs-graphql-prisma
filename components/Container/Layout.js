import Header from "../Component/Common/Header";
import Footer from "../Component/Common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="mb-auto flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
