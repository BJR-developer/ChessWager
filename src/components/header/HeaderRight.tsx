import { SignInButton } from "./buttons/SignInButton"
import { Dropdown } from "./dropdown/Dropdown"
import { MainHeaderButton } from "./buttons/MainHeaderButton"
import { BiSearchAlt2 } from "react-icons/bi"
import {
  RiChat2Line,
  RiNotification3Line,
  RiUserHeartLine,
} from "react-icons/ri"
import { ConversationsState } from "../containers/ConversationsState"
import { DarkMode } from "../containers/DarkMode"
import { FaRegGem } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"

export const HeaderRight: React.FC = () => {
  const { doesUserHaveNewMessages } = ConversationsState.useContainer()
  const { isDarkOn } = DarkMode.useContainer()

  const messageIcon: React.ReactNode = doesUserHaveNewMessages ? (
    <RiChat2Line
      size="21"
      className="m-2"
      color={isDarkOn ? "#4ade80" : "#15803d"}
    />
  ) : (
    <RiChat2Line size="21" className="m-2" />
  )

  const setNewMessagesToFalse = () => {}

  return (
    <div className="flex-auto justify-end align-middle flex mx-3 gap-1.5">
      <MainHeaderButton
        title="Search Users"
        openToMenu="searchUsers"
        icon={<BiSearchAlt2 size="21" className="m-2" />}
      />
      <MainHeaderButton
        title="Messages"
        openToMenu="messages"
        icon={messageIcon}
        onClick={setNewMessagesToFalse}
      />
      <MainHeaderButton
        title="Following"
        openToMenu="following"
        icon={<RiUserHeartLine size="21" className="m-2" />}
      />
      <MainHeaderButton
        title="Notifications"
        openToMenu="notifications"
        icon={<RiNotification3Line size="21" className="m-2" />}
      />
      <MainHeaderButton
        title="Bets"
        openToMenu="bets"
        icon={<FaRegGem size="21" className="m-2" />}
      />
      <MainHeaderButton
        title="Persona"
        openToMenu="persona"
        icon={<CgProfile size="21" className="m-2" />}
      />
      <SignInButton />
      <Dropdown />
    </div>
  )
}
