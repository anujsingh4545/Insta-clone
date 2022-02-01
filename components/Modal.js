import { Snapshot, useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { CameraIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  const filePicker = useRef(null);
  const [selectedFile, SetSelectedFile] = useState(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const UploadPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });
    });

    setOpen(false);
    SetSelectedFile(null);
    setLoading(false);
  };

  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      SetSelectedFile(readerEvent.target.result);
    };
  }

  function setClose() {
    setOpen(false);
  }
  return (
    <div>
      {open && (
        <>
          <div className=" z-10 fixed  w-[100%] top-0 h-[100%] bg-[#a1a2a3bb] " onClick={setClose}></div>
          <div className="  z-20 fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[70%] md:w-[40%] xl:w-[30%] flex items-center flex-col  bg-white rounded-2xl blur-0">
            {selectedFile ? (
              <img src={selectedFile} alt="error" className="w-[90%] my-5 rounded object-contain cursor-pointer" onClick={() => SetSelectedFile(null)} />
            ) : (
              <>
                <section className="relative w-[4rem]  rounded-full bg-red-100 m-auto mt-5">
                  <CameraIcon className="relative p-2 text-red-400 cursor-pointer" onClick={() => filePicker.current.click()} />
                  <input type="file" className="hidden" ref={filePicker} onChange={addImageToPost} />
                </section>
                <p className="text-center my-3 text-[1rem] font-semibold text-[#777] xl:text-[1.3rem] italic">Upload a photo</p>
              </>
            )}

            <input type="text" placeholder="Please enter a caption..." className="text-center text-black text-[1rem] w-[100%] mb-9 outline-none h font-semibold italic" ref={captionRef} />

            <button disabled={!selectedFile} className=" w-[90%]  mb-8 p-2 italic rounded-md bg-orange-600 text-white disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300" onClick={UploadPost}>
              {loading ? "Loading..." : "Upload Post"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;
