import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SaisieDuJour from "./pages/SaisieDuJour";
import Calendrier from "./pages/Calendrier";
import Statistiques from "./pages/Statistiques";
import Layout from "./components/Layout";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<SaisieDuJour />} />
                    <Route path="/calendrier" element={<Calendrier />} />
                    <Route path="/statistiques" element={<Statistiques />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
