import React, { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import { supabase } from "../../utils/supabaseClient";

const Places = ({ handleOrderPopup }) => {
  const [placesData, setPlacesData] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const sqlQuery = 'SELECT * FROM package;';

      const { data, error } = await supabase
        .from("package")
        .select("*");

      if (error) {
        console.error("Error fetching places data:", error);
      } else {
        console.log("Fetched data:", data); // Log fetched data
        setPlacesData(data);
      }
      console.log("Executing SQL query:", sqlQuery);
    };

    fetchPlaces();
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container ">
        <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Best Places to Visit
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {placesData.map((item, index) => (
            <PlaceCard
              handleOrderPopup={handleOrderPopup}
              key={index}
              img={item.image_url}
              title={item.pkg_name}
              location={item.location}
              description={item.pkg_desc}
              price={item.pkg_price}
              type={item.pkg_type}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Places;