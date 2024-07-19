import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";

const updateUserAllergies = async (
  userEmail: string,
  selectedAllergies: string[]
) => {
  const allergyCollectionRef = collection(FIRESTORE_DB, "allergies");

  const userQuery = query(
    allergyCollectionRef,
    where("email", "==", userEmail)
  );
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    await addDoc(allergyCollectionRef, {
      email: userEmail,
      allergies: selectedAllergies,
    });
  } else {
    const userDoc = userSnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      allergies: selectedAllergies,
    });
  }
};

export default updateUserAllergies;
