import { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { IUserAllergies } from "../types/Types";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFetchUserAllergies = () => {
  const [userAllergies, setUserAllergies] = useState<IUserAllergies>();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      // Check if user is defined before executing the query
      if (user) {
        const q = query(
          collection(FIRESTORE_DB, "allergies"),
          where("email", "==", user)
        );

        try {
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const userAllergiesData = {
              allergies: doc.data().allergies,
              email: doc.data().email,
            };
            setUserAllergies(userAllergiesData);
          });
        } catch (error) {
          console.error("Error fetching user allergies data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return userAllergies;
};

export default useFetchUserAllergies;
