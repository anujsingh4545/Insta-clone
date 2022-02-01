import { async } from "@firebase/util";
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Component, useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [Likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      TimeStamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("TimeStamp", "desc")), (snapshot) => setComments(snapshot.docs));
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    setHasLiked(Likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [Likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", id));
  };

  return (
    <div className="bg-[#7c7c7c2b]   rounded-2xl  w-[95%] sm:w-[80%] md:w-[90%] my-3 md:my-5 m-auto ">
      {/* Header */}
      <div className="flex items-center p-3">
        <img src={userImg} alt="Image" className="rounded-full h-12 w-12 object-contain  border p-1 mr-3 " />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer mr-1" />
      </div>

      {/* Image */}
      <img src={img} alt="" className="object-cover w-[90%] m-auto rounded-xl " />

      {/* Buttons */}

      {session && (
        <div className="flex justify-between px-5  py-3 ">
          <div className="flex space-x-3 ">
            {hasLiked ? <HeartIconFilled onClick={likePost} className="btns text-red-600" /> : <HeartIcon onClick={likePost} className="btns " />}

            <ChatIcon className="btns" />
            <TrashIcon className="btns" onClick={deletePost} />
          </div>
          <BookmarkIcon className="btns " />
        </div>
      )}

      {/* Caption */}
      <h2 className="px-5 py-2 truncate">
        {Likes.length > 0 && session && <p className="font-bold mb-1  ">{Likes.length} likes </p>}
        <span className="font-bold mr-1"> {username}</span> {caption}
      </h2>

      {/* Comments */}

      {comments.length > 0 && (
        <div className=" ml-8 md:ml-10 mt-1 h-20 md:h-24  overflow-y-scroll scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-center mt-2 space-x-2 mb-3">
              <img src={comment.data().userImage} className="h-7 rounded-full" alt="" />
              <p className="text-sm flex-1 text-[#dad7d7]">
                <span className="font-bold text-white">{comment.data().username}</span> {comment.data().comment}
              </p>
              <Moment fromNow className="pr-4 italic text-xs ">
                {comment.data().TimeStamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input Comment */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="outline-none flex-1 mx-2 bg-transparent text-white " />
          <button disabled={!comment.trim()} type="submit" onClick={sendComment} className="font-semibold text-blue-400 ">
            post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
