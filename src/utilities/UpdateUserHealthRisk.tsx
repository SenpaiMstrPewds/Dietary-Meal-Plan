import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";

const updateUserHealthRisk = async (
  userEmail: string,
  selectedHealthRisk: string[]
) => {
  const healthRiskCollectionRef = collection(FIRESTORE_DB, "healthRisk");

  const userQuery = query(
    healthRiskCollectionRef,
    where("email", "==", userEmail)
  );
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    await addDoc(healthRiskCollectionRef, {
      email: userEmail,
      healthRisk: selectedHealthRisk,
    });
  } else {
    const userDoc = userSnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      healthRisk: selectedHealthRisk,
    });
  }
};

export default updateUserHealthRisk;
