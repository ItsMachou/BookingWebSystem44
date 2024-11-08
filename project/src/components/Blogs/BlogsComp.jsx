import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/tajmahal.jpg";
import Img2 from "../../assets/places/maldives2.jpg";
import Img3 from "../../assets/places/japan.jpg";
import Img4 from "../../assets/places/merlion2.jpg";
import Img5 from "../../assets/places/temple.jpg";
import Img11 from "../../assets/places/dubai.jpg";

// New images for local (Philippine) destinations
import Img6 from "../../assets/places/boracay.jpg";
import Img7 from "../../assets/places/puertoprincesa2.jpg";
import Img8 from "../../assets/places/baler.jpg";
import Img9 from "../../assets/places/caviteshrine.jpg";
import Img10 from "../../assets/places/bukidnon2.jpg";
import Img12 from "../../assets/places/cebu.jpg";

//Placeholder images
import Img13 from "../../assets/places/tajmahal2.jpg";
import Img14 from "../../assets/places/maldives.jpg";
import Img15 from "../../assets/places/mtfuji.jpg";
import Img16 from "../../assets/places/merlion.jpeg";
import Img17 from "../../assets/places/emeraldbuddha.jpg";
import Img18 from "../../assets/places/burjkhalifa.jpg";
import Img19 from "../../assets/places/boracaybeach.png";
import Img20 from "../../assets/places/puertoprincesa.jpg";
import Img21 from "../../assets/places/BalerAurora.jpg";
import Img22 from "../../assets/places/etivac.jpg";
import Img23 from "../../assets/places/bukidnoners.jpg";
import Img24 from "../../assets/places/cebuano.jpg";
const BlogsData = [
  // International Spots
  {
    id: 1,
    image: Img1,
    title: "Taj Mahal",
    description:
      "The Taj Mahal stands as an enduring symbol of love and architectural grandeur in Agra, India. This breathtaking monument, built by Emperor Shah Jahan for his beloved wife, Mumtaz Mahal, captivates visitors with its flawless white marble facade, intricate carvings, and majestic symmetry. Framed by lush gardens and reflecting pools, the Taj Mahal represents a pinnacle of Mughal architecture, drawing millions to experience its serene beauty and historical significance. Surrounding Agra, visitors can also explore the historic Agra Fort, a UNESCO World Heritage Site, and the colorful markets that reflect India’s vibrant culture and artisanal traditions. The Taj Mahal remains a must-see destination, embodying both India's romantic heritage and architectural brilliance.",
    author: "Travel Writer",
    date: "April 22, 2024",
    category: "International",
    placeholderImage: Img13, // Add your placeholder image path here
  },
  {
    id: 2,
    image: Img2,
    title: "Maldives",
    description:
      "The Maldives offers a paradise of turquoise waters, pristine white-sand beaches, and luxurious resorts that promise relaxation and rejuvenation. This island nation, located in the heart of the Indian Ocean, is renowned for its vibrant coral reefs and abundant marine life, making it a premier destination for snorkeling and diving enthusiasts. From overwater bungalows offering breathtaking ocean views to serene spa retreats surrounded by tropical flora, the Maldives embodies the perfect getaway for romance, adventure, or peaceful solitude. Whether watching a stunning sunset over the Indian Ocean or dining under starlit skies, the Maldives provides an unparalleled experience of natural beauty and tranquility.",
    author: "Explorer",
    date: "April 22, 2024",
    category: "International",
    placeholderImage: Img14,
  },
  {
    id: 3,
    image: Img3,
    title: "Mt Fuji",
    description:
      "Mt. Fuji, Japan’s most iconic peak, is a symbol of natural beauty and spiritual significance. This sacred mountain, with its perfectly symmetrical cone, has inspired artists and pilgrims alike for centuries. Rising majestically over 3,700 meters, it offers a stunning sight, especially when its snow-capped summit reflects in nearby lakes during cherry blossom season or autumn foliage. Visitors can explore the Fuji Five Lakes region for scenic hiking, boating, and hot springs, or embark on the challenge of climbing to the summit. With views spanning distant cities and forests, Mt. Fuji captures the essence of Japan’s harmonious blend of nature and spirituality, making it a must-visit landmark.",
    author: "Culture Enthusiast",
    date: "April 22, 2024",
    category: "International",
    placeholderImage: Img15,
  },
  {
    id: 4,
    image: Img4,
    title: "Merlion",
    description:
      "The Merlion, Singapore’s iconic symbol, represents the city's fascinating blend of rich heritage and modern innovation. This half-fish, half-lion statue, perched at Marina Bay, embodies Singapore’s origin as a fishing village and its strength as a city-state. Visitors to the Merlion Park enjoy panoramic views of Marina Bay Sands, the ArtScience Museum, and Singapore’s dazzling skyline. Beyond the Merlion, Singapore offers a world of experiences: from the lush Gardens by the Bay, with its Supertrees that light up the night, to vibrant cultural neighborhoods like Chinatown and Little India. Singapore’s efficient infrastructure and multicultural flair make it a dynamic and accessible destination for global travelers.",
    author: "Travel Blogger",
    date: "May 15, 2024",
    category: "International",
    placeholderImage: Img16,
  },
  {
    id: 5,
    image: Img5,
    title: "The Temple of Emerald Buddha",
    description:
      "The Temple of the Emerald Buddha, or Wat Phra Kaew, is Thailand’s most revered temple, located within the Grand Palace complex in Bangkok. Housing a jade statue of the Buddha dating back to the 15th century, this sacred site attracts millions seeking both spiritual reflection and admiration of its architectural grandeur. The temple complex dazzles with golden spires, intricate murals, and detailed sculptures depicting Thai mythology. Beyond Bangkok, Thailand offers serene beaches in Phuket, cultural richness in Chiang Mai, and bustling markets filled with unique crafts and flavors. The Temple of the Emerald Buddha stands at the heart of Thailand’s heritage, embodying its spiritual and artistic essence.",
    author: "Adventure Seeker",
    date: "June 10, 2024",
    category: "International",
    placeholderImage: Img17,
  },
  {
    id: 11,
    image: Img11,
    title: "Burj Khalifa",
    description:
      "The Burj Khalifa in Dubai, the tallest structure in the world, is an architectural marvel that defines Dubai's skyline. This towering skyscraper reaches a height of over 828 meters, offering breathtaking views from its observation decks and luxurious experiences within its residences and hotels. Beyond the Burj, Dubai’s allure includes the extravagant Dubai Mall, the traditional souks that reflect its cultural heritage, and the adventurous desert safaris where visitors can experience dune bashing and Bedouin hospitality. With its blend of futuristic architecture, luxury shopping, and cultural treasures, Dubai remains a dazzling and unique destination for travelers from around the globe.",
    author: "Travel Guru",
    date: "August 5, 2024",
    category: "International",
    placeholderImage: Img18,
  },
  // Local (Philippines) Spots
  {
    id: 6,
    image: Img6,
    title: "Boracay Beach",
    description:
      "Famous for its powdery white sands and crystal-clear waters, Boracay Beach in the Philippines is a tropical paradise that draws travelers from around the world. The island’s vibrant nightlife, watersports, and lively beach parties make it a perfect spot for those seeking both relaxation and excitement. Boracay’s rich coral reefs provide excellent opportunities for snorkeling and diving, while sunset boat rides offer unforgettable views. Despite its popularity, Boracay retains a laid-back charm that captures the essence of island life.",
    author: "Philippine Tourism",
    date: "May 15, 2024",
    category: "Local",
    placeholderImage: Img19,
  },
  {
    id: 7,
    image: Img7,
    title: "Puerto Princesa",
    description:
      "Puerto Princesa is known for its stunning natural wonders, most notably the UNESCO World Heritage-listed Underground River. This subterranean river stretches beneath limestone karsts, offering a unique and breathtaking experience for nature lovers. In addition to the river, Puerto Princesa is surrounded by lush rainforests, stunning beaches, and a variety of wildlife. It is an ecotourism destination that promises adventure and relaxation, as well as a glimpse into the Philippines' commitment to preserving its natural beauty.",
    author: "Philippine Tourism",
    date: "May 20, 2024",
    category: "Local",
    placeholderImage: Img20,
  },
  {
    id: 8,
    image: Img8,
    title: "Baler",
    description:
      "Known as the birthplace of surfing in the Philippines, Baler attracts adventure seekers and beach lovers alike. The waves at Sabang Beach make it a perfect spot for beginners and pros alike. Beyond the surf, Baler offers waterfalls, caves, and historical sites, including the Baler Church, which holds a special place in Filipino history. With a mix of natural beauty and cultural significance, Baler is a must-visit for those looking to experience the outdoors and the warmth of a seaside community.",
    author: "Philippine Tourism",
    date: "June 5, 2024",
    category: "Local",
    placeholderImage: Img21,
  },
  {
    id: 9,
    image: Img9,
    title: "Cavite",
    description:
      "Cavite is steeped in history and natural beauty, offering travelers an array of cultural landmarks and scenic spots. This province played a pivotal role in the Philippine Revolution and is home to historic sites like the Aguinaldo Shrine. With its mountain views, beach resorts, and waterfalls, Cavite also appeals to nature enthusiasts. Cavite’s blend of history and natural attractions makes it an ideal getaway for those seeking a deeper understanding of Philippine heritage alongside scenic landscapes.",
    author: "Philippine Tourism",
    date: "June 15, 2024",
    category: "Local",
    placeholderImage: Img22,
  },
  {
    id: 10,
    image: Img10,
    title: "Bukidnon",
    description:
      "Nestled in the highlands of Mindanao, Bukidnon is known for its cool climate, pine trees, and adventurous attractions. Visitors can explore the Dahilayan Adventure Park, home to Asia's longest dual zipline, or hike through scenic mountain trails. The province's pineapple plantations, rolling hills, and ranches give it a unique rural charm. Bukidnon is an ideal destination for travelers looking to escape the heat and enjoy outdoor adventures in a refreshing, natural setting.",
    author: "Philippine Tourism",
    date: "June 20, 2024",
    category: "Local",
    placeholderImage: Img23,
  },
  {
    id: 12,
    image: Img12,
    title: "Cebu Island Adventures",
    description:
      "Cebu is an island of diverse experiences, combining historical landmarks with natural wonders. Discover the famed Magellan’s Cross in Cebu City, explore the Spanish-colonial architecture, or dive into the island’s vibrant underwater world at Moalboal. Cebu’s beaches, especially on neighboring islands, offer pristine sands and clear waters perfect for diving and snorkeling. With its bustling city life, scenic mountains, and rich history, Cebu is a dynamic destination that captures the heart of the Philippines.",
    author: "Local Guide",
    date: "July 25, 2024",
    category: "Local",
    placeholderImage: Img24,
  },
];

const BlogsComp = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container">
          <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Our Latest Blogs
          </h1>

          {/* International Section */}
          <h2 className="my-4 text-2xl font-semibold">
            International Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {BlogsData.filter((item) => item.category === "International").map(
              (item) => (
                <BlogCard key={item.id} {...item} />
              )
            )}
          </div>

          {/* Local Section */}
          <h2 className="my-4 text-2xl font-semibold">Local Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BlogsData.filter((item) => item.category === "Local").map(
              (item) => (
                <BlogCard key={item.id} {...item} />
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;