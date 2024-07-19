import { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { IUser } from "../types/Types";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFetchUserData = () => {
  const [userData, setUserData] = useState<IUser>();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, "users"),
        where("email", "==", user)
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const userData = {
            dateOfBirth: doc.data().dateOfBirth,
            email: doc.data().email,
            fullName: doc.data().fullName,
            imageUrl: doc.data().imageUrl,
          };
          setUserData(userData);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  return userData;
};

export default useFetchUserData;
