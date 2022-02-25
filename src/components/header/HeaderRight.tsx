import { ChatButton } from "./buttons/ChatButton"
import { FriendsButton } from "./buttons/FriendsButton"
import { NotificationButton } from "./buttons/NotificationButton"
import { SignInButton } from "./buttons/SignInButton"
import { Dropdown } from "./dropdown/Dropdown"
import { SearchButton } from "./buttons/SearchButton"

export const HeaderRight: React.FC = () => {
  return (
    <div className="flex-auto justify-end align-middle flex mx-3 gap-1.5">
      <SearchButton/>
      <ChatButton />
      <FriendsButton />
      <NotificationButton />
      <SignInButton />
      <Dropdown />
    </div>
  )
}
