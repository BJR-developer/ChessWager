import "../../../../../style/scrollbar.scss"
import { useState } from "react"

export const FollowingList: React.FC = ({}) => {
  const [following, setFollowing] = useState([])

  return (
    <>
      {following.length > 0 ? (
        <div
          className="scrollbar-dropdown h-72 w-full overflow-y-auto overflow-x-hidden ml-0.5"
          style={{ direction: "rtl" }}
        />
      ) : (
        <div className="h-72 mt-10 w-64 justify-center flex dark:text-stone-400 text-stone-400">
          Not following anyone yet
        </div>
      )}
    </>
  )
}
