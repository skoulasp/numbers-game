import { useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Container from "./Components/Container";
import "./saas/stylesheet.scss";

function App() {
    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <>
            <Header />
            <Container />
            <Footer />
        </>
    );
}

export default App;
