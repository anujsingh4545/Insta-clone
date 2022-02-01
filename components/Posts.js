import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timeStamp", "desc")), (snapshot) => {
      setPosts(snapshot.docs);
    });
    return unsubscribe;
  }, [db]);

  return (
    <div className=" md:w-[60%] relative   md:max-h-[90vh] overflow-y-auto scrollbar-hide">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} />
      ))}
    </div>
  );
}

export default Posts;
