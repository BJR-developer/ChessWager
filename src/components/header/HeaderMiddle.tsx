import "../../style/buttons.scss"
import { Auth } from "../containers/Auth"

interface Props {}

export const HeaderMiddle: React.FC<Props> = ({}) => {
  const { isFirstLogin } = Auth.useContainer()
  return (
    <div className="flex-auto" id="header-middle">
      <div className="flex justify-center">
        {isFirstLogin && (
          <button className="color-shift clickable animate-pulse rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300">
            Make your first bet
          </button>
        )}
      </div>
    </div>
  )
}
