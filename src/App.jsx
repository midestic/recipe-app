import { useState, useEffect } from "react";
import Searchbar from "./components/SearchBar/Searchbar";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import InnerContainer from "./components/InnerContainer/InnerContainer";
import FoodMap from "./components/foodMap/FoodMap";
import FoodDetails from "./components/foodDetails/FoodDetails";
import styles from "./App.module.css";

function App() {
  let [foodData, setFoodData] = useState([]);
  let [foodId, setFoodId] = useState("642583");
  let [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewRecipe = (id) => {
    if (window.innerWidth <= 768) {
      setIsModalOpen(true);
    }
    setFoodId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Searchbar foodData={foodData} setFoodData={setFoodData} />

      <Container>
        <InnerContainer>
          <FoodMap foodData={foodData} setFoodId={handleViewRecipe} />
        </InnerContainer>

        {window.innerWidth > 768 && (
          <InnerContainer>
            <FoodDetails foodId={foodId} />
          </InnerContainer>
        )}
      </Container>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <InnerContainer>
              <FoodDetails foodId={foodId} />
            </InnerContainer>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
