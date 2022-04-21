import { TextareaAutosize } from "@mui/material"
import { Auth } from "../../../../containers/Auth"
import "../../../../../style/dropdown.scss"
import { BiSend } from "react-icons/bi"
import {
  addDoc,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
const db = getFirestore(firebaseApp)

interface Props {
  dummy: React.RefObject<HTMLInputElement>
  messagesRef: CollectionReference<DocumentData>
  formValue: string
  setFormValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((formValue: string) => void)
  conversationDocRef: DocumentReference<DocumentData>
}
export const ConvoChatForm: React.FC<Props> = ({
  dummy,
  messagesRef,
  formValue,
  setFormValue,
  conversationDocRef,
}) => {
  const { user, auth } = Auth.useContainer()

  const sendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    if (formValue.trim() === "" || !user || !auth.currentUser) return

    const { uid, photoURL, displayName } = auth.currentUser

    addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      userName: displayName,
    })

    const conversation = (await getDoc(conversationDocRef)).data() // I think we already call this in the Conversations state component, could be massively improved

    const isUser1 =
      (conversation?.user1.id ?? "") === (auth.currentUser?.uid ?? " ")
    const isUser2 =
      (conversation?.user2.id ?? "") === (auth.currentUser?.uid ?? " ")

    const batch = writeBatch(db)
    if (isUser1) {
      const userRef = doc(db, "users", conversation!.user2.id)
      batch.update(userRef, {
        hasNewMessage: true,
      })
      batch.update(conversationDocRef, {
        messageThumbnail: formValue,
        doesUser2HaveUnreadMessages: true,
        modifiedAt: serverTimestamp(),
      })
    } else if (isUser2) {
      const userRef = doc(db, "users", conversation!.user1.id)
      batch.update(userRef, {
        hasNewMessage: true,
      })

      batch.update(conversationDocRef, {
        messageThumbnail: formValue,
        doesUser1HaveUnreadMessages: true,
        modifiedAt: serverTimestamp(),
      })
    } else {
      throw new Error("User not in conversation")
    }
    batch.commit()

    setFormValue("")
    dummy.current?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className="flex-col justify-start w-full grow pb-2">
      <fieldset
        disabled={!auth.currentUser}
        className="fieldset justify-center flex"
      >
        <form
          onSubmit={sendMessage}
          className="form justify-between w-full flex"
        >
          <TextareaAutosize
            value={auth.currentUser ? formValue : "Sign in to Chat"}
            onChange={(e) => {
              setFormValue(e.target.value)
            }}
            className="scrollbar break-words inline-block resize-none outline-none text-md grow p-2 bg-stone-300 dark:bg-stone-800 dark:text-stone-50 rounded-md ml-2"
            placeholder="Send a Message"
            maxRows={4}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage(e)
            }}
          />
          <div className="flex flex-col-reverse">
            <button
              className="grid place-content-center mr-2 ml-1.5 mb-1 rounded-full p-1.5 hover:bg-stone-400 dark:hover:bg-stone-800 color-shift"
              title="Press Enter to Send"
            >
              <BiSend size="25" />
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}
