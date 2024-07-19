import { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { IUserHealthRisks } from "../types/Types";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFetchUserHealthRisk = () => {
  const [userHealthRisks, setUserHealthRisks] = useState<IUserHealthRisks>();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      // Check if user is defined before executing the query
      if (user) {
        const q = query(
          collection(FIRESTORE_DB, "healthRisk"),
          where("email", "==", user)
        );

        try {
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const userHealthRisksData = {
              healthRisk: doc.data().healthRisk,
              email: doc.data().email,
            };
            setUserHealthRisks(userHealthRisksData);
          });
        } catch (error) {
          console.error("Error fetching user health risk data:", error);
        }
      }
    };

    fetchData();
  }, [userHealthRisks]);

  return userHealthRisks;
};

export default useFetchUserHealthRisk;
