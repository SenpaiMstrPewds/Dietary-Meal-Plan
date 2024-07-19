import { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { IBmiResult } from "../types/Types";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFetchCurrentBmiData = () => {
  const [bmiResult, setBmiResult] = useState<IBmiResult>();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, "bmiResult"),
        where("email", "==", user)
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const bmiResultData = {
            id: doc.id,
            age: doc.data().age,
            bmiCategory: doc.data().bmiCategory,
            bmiResult: doc.data().bmiResult,
            createdAt: doc.data().createdAt,
            email: doc.data().email,
            gender: doc.data().gender,
            height: doc.data().height,
            weight: doc.data().weight,
          };
          setBmiResult(bmiResultData);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  return bmiResult;
};

export default useFetchCurrentBmiData;
