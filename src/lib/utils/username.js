import { query, collection, where, getDocs } from "firebase/firestore";
import { database } from "lib/firebase";

// Checks if a username already exists in the database
export async function isDuplicateUsername(username) {
    const _query = query(collection(database, "users"), where("username", "==", username))
    const snapshot = await getDocs(_query);
    return snapshot && snapshot.size > 0;
}

