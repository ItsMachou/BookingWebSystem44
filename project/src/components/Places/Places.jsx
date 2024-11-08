import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/boracay.jpg";
import Img2 from "../../assets/places/puertoprincesa.jpg";
import Img3 from "../../assets/places/baler.jpg";
import Img4 from "../../assets/places/japan.jpg";
import Img5 from "../../assets/places/tajmahal.jpg";
import Img6 from "../../assets/places/burj.jpg";

const PlacesData = [
  {
    img: Img1,
    title: "Boracay",
    location: "Palawan",
    description:
      "Famous for its powdery white sands and crystal-clear waters. Boracay Beach in the Philippines is a tropical paradise that draws travelers from around the world.",
    price: 5000,
    type: "Relax with Nature",
  },
  {
    img: Img2,
    title: "Puerto Princesa",
    location: "Palawan",
    description:
      "Puerto Princesa is known for its stunning natural wonders. This subterranean river stretches beneath limestone karsts, offering a breathtaking experience for nature lovers.",
    price: 5000,
    type: "Relax with Nature",
  },
  {
    img: Img3,
    title: "Baler",
    location: "Aurora",
    description:
      "The waves at Sabang Beach make it a perfect spot for beginners and pros alike. Known as the birthplace of surfing in the Philippines",
    price: 5000,
    type: "Relax with Nature",
  },
  {
    img: Img4,
    title: "Tokyo",
    location: "Japan",
    description:
      "Discover the serene beauty of Tokyo's most revered shrine, a sanctuary of tradition amidst the city's vibrant energy.",
    price: 5000,
    type: "Cultural Relax",
  },
  {
    img: Img5,
    title: "Taj Mahal",
    location: "India",
    description:
      "Set on the south bank of the Yamuna River in Agra, the Taj Mahal is an exquisite ivory-white marble mausoleum, celebrated for its stunning beauty and historical significance.",
    price: 5000,
    type: "Cultural Relax",
  },
  {
    img: Img6,
    title: "Burj Khalifa",
    location: "Dubai",
    description:
      "Dubai is a city of contrasts, where modern skyscrapers meet ancient traditions. Experience the luxury and innovation of the Burj Khalifa, the world’s tallest building.",
    price: 5000,
    type: "Cultural Relax",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Best Places to Visit
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;