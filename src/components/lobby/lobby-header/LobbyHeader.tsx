import { AscDescDisplay } from "./AscDescDisplay"
import { LobbyHeaderButtons } from "./LobbyHeaderButtons"
import { LobbyHeaderState } from "./LobbyHeaderState"

export const LobbyHeader: React.FC = () => {
  return (
    <LobbyHeaderState.Provider>
      <div className="flex w-full h-6 bg-stone-200 dark:bg-stone-800 border-b border-stone-400 dark:border-stone-700">
        <AscDescDisplay />
        <LobbyHeaderButtons />
      </div>
    </LobbyHeaderState.Provider>
  )
}
