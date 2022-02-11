import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { useState } from "react"
import { DropdownItem } from "../DropdownItem"
import Toggle from "react-toggle"

import { StaticDropdownItem } from "../StaticDropdownItem"
import { RiChatDeleteLine } from "react-icons/ri"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { MdOutlineBlock } from "react-icons/md"
import { GoUnmute } from "react-icons/go"
import { ImVolumeMute2 } from "react-icons/im"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Settings: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  heightMultiplier,
}) => {
  const [profanityFilter, setProfanityFilter] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            setActiveMenu={setActiveMenu}
            key={0}
          >
            <h2>Settings</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1} />,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<MdOutlineBlock />}
            goToMenu="blocked"
            key={2}
          >
            Blocked Users
          </DropdownItem>,

          <StaticDropdownItem
            onClick={() => {
              setIsMuted(!isMuted)
            }}
            leftIcon={isMuted ? <GoUnmute /> : <ImVolumeMute2 />}
            rightIcon={
              <div className="p-2 justify-center align-middle flex h-full">
                <Toggle
                  className="filter-toggle pointer-events-none "
                  checked={isMuted}
                  readOnly
                />
              </div>
            }
            key={3}
          >
            Sound
          </StaticDropdownItem>,

          <StaticDropdownItem
            leftIcon={<RiChatDeleteLine />}
            onClick={() => {
              setProfanityFilter(!profanityFilter)
            }}
            rightIcon={
              <div className="p-2 justify-center align-middle flex h-full">
                <Toggle
                  className="filter-toggle pointer-events-none "
                  checked={profanityFilter}
                  readOnly
                />
              </div>
            }
            key={4}
          >
            Profanity Filter
          </StaticDropdownItem>,
        ]}
        thisMenu={"settings"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
