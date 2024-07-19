import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { FIRESTORE_DB } from "../firebase/FirebaseConfig";
import useAuthStore from "../zustand/AuthStore";
import { getChatReply } from "../OpenAI";
import useFetchUserData from "../utilities/CurrentUser";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const currentUser = useFetchUserData();
  const chatCollectionRef = collection(FIRESTORE_DB, `chats/${user}/messages`);

  useLayoutEffect(() => {
    const userQuery = query(chatCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const userMessages: IMessage[] = querySnapshot.docs.map(
        (doc) =>
          ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          } as IMessage)
      );
      setMessages(userMessages);
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    try {
      const userMessage = messages[0].text;

      // Append the user's message to the local state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      // Save the user's message to Firestore
      const userMessageDoc: IMessage = {
        _id: messages[0]._id, // Use the same ID as the user's message
        text: userMessage,
        createdAt: messages[0].createdAt,
        user: messages[0].user,
      };
      await addDoc(chatCollectionRef, userMessageDoc);

      setLoading(true);

      // Fetch AI reply based on the user's message
      const aiReply = await getChatReply(userMessage);

      // Construct AI message object
      const aiMessage: IMessage = {
        _id: messages[0]._id + "1", // Use a unique ID for the AI message
        text: aiReply,
        createdAt: new Date(),
        user: {
          _id: "ai-bot",
          name: "AI Bot",
          avatar: "https://placeimg.com/140/140/any",
        },
      };

      // Save the AI's message to Firestore
      await addDoc(chatCollectionRef, aiMessage);

      // Append the AI's message to the local state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [aiMessage])
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      placeholder={
        loading ? "Please wait for AI's reply.." : "Type your message here..."
      }
      user={{
        _id: currentUser?.email || "",
        name: currentUser?.fullName || "",
        avatar: currentUser?.imageUrl || "",
      }}
      renderSend={(props) => (
        <Send {...props} disabled={loading || !props?.text?.trim()} />
      )}
    />
  );
};

export default Chat;
