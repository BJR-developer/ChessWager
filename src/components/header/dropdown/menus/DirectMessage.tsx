import { BiArrowBack } from "react-icons/bi"
import { DropdownItem } from "../DropdownItem"
import { Menu } from "../Menu"
import { MenuLine } from "../MenuLine"

export const DirectMessage: React.FC = ({}) => {
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="searchedUser"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Direct Messages"
          />,
          <MenuLine key={1} />,
        ]}
        thisMenu={"directMessage"}
      />
    </>
  )
}
