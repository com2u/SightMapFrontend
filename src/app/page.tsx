// import { getSights } from "@/lib/graphql/queries";
// import client from "@/lib/graphql/serverClient";
// import dynamic from "next/dynamic";

// async function HomePage() {
//     const { data } = await client.query({
//         query: getSights,
//     });

//     const Map = dynamic(() => import("../components/Map"), {
//         loading: () => <p style={{ marginLeft: "20px" }}>Map is loading</p>,
//         ssr: false,
//     });
//     return <Map locations={data.sights} />;
// }

// export default HomePage;
"use client";

import { useEffect, useState } from "react";
import { getSights } from "@/lib/graphql/queries";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => <p style={{ marginLeft: "20px" }}>Map is loading</p>,
  ssr: false,
});

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sights", {
          method: "POST",
        });
        const data = await response.json();
        if (data.error) {
          setError(new Error(data.error));
        } else {
          setLocations(data.sights); // Adjust based on your GraphQL response structure
        }
      } catch (err) {
        console.error("Error fetching sights:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) return <p style={{ marginLeft: "20px" }}>Loading...</p>;
  if (error) return <p style={{ marginLeft: "20px" }}>Error loading sights: {error.message}</p>;

  return <Map locations={locations} />;
};

export default HomePage;
