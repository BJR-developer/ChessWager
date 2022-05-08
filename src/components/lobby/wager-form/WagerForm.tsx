import { useState } from "react"
import { GameState } from "../../containers/GameState"
import { Auth } from "../../containers/Auth"
import { SideChooser } from "./SideChooser"
import { BetAmount } from "./BetAmount"
import { Multiplier } from "./Multiplier"
import { Total } from "./Total"
import { PlaceBet } from "./PlaceBet"
import { QuickBet } from "./QuickBet"
import { TheirBet } from "./TheirBet"
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore"
import { firebaseApp } from "../../../config"
import { UserDataState } from "../../containers/UserDataState"

const db = getFirestore(firebaseApp)

export const WagerForm: React.FC = () => {
  const { gameId } = GameState.useContainer()
  const {
    walletAddress,
    isWalletConnected,
    auth,
    connectWallet,
    doesUserHaveEnoughAvax,
  } = Auth.useContainer()

  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState<"white" | "black">("white")
  const [betAmount, setBetAmount] = useState(0.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const [localAvaxAmount, setLocalAvaxAmount] = useState("")
  const [localUsdAmount, setLocalUsdAmount] = useState("")
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  const lobbyRef = collection(db, "lobby")

  const canUserBet: () => Promise<boolean> = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to bet")
      return false
    } else if (betAmount === 0) {
      setIsAmountEmpty(true)
      return false
    } else if (!isWalletConnected) {
      connectWallet()
      return false
    } else if (!(await doesUserHaveEnoughAvax(betAmount))) {
      alert("Deposit more avax to place this bet")
      return false
    }
    return true
  }
  const { userData } = UserDataState.useContainer()

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(await canUserBet())) return

    const { uid, photoURL, displayName } = auth.currentUser!

    addDoc(lobbyRef, {
      amount: betAmount,
      betSide: betSide,
      createdAt: serverTimestamp(),
      gameId: gameId,
      multiplier: multiplier,
      status: "ready",
      user1Id: uid,
      user1Metamask: user1Metamask,
      user1PhotoURL: photoURL,
      user1DisplayName: displayName,
      user1FollowThrough: [
        userData!.betFundedCount,
        userData!.betAcceptedCount,
      ],
      contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
      hasUser1SeenUpdate: false,
      hasUser2SeenUpdate: false,
    }).catch(console.error)
  }

  return (
    <div className="flex h-full rounded-b-md border-r border-b  border-stone-400 bg-stone-200 shadow-2xl dark:border-stone-700 dark:bg-stone-900">
      <div className="flex w-full p-2">
        <fieldset className="flex w-full">
          <form
            onSubmit={createWager}
            className="w-full"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault()
            }}
          >
            <div className="flex flex-col justify-around gap-4">
              <SideChooser betSide={betSide} setBetSide={setBetSide} />
              <QuickBet
                setBetAmount={setBetAmount}
                setLocalAvaxAmount={setLocalAvaxAmount}
                setLocalUsdAmount={setLocalUsdAmount}
                setIsAmountEmpty={setIsAmountEmpty}
              />
              <BetAmount
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                localAvaxAmount={localAvaxAmount}
                setLocalAvaxAmount={setLocalAvaxAmount}
                localUsdAmount={localUsdAmount}
                setLocalUsdAmount={setLocalUsdAmount}
                isAmountEmpty={isAmountEmpty}
                setIsAmountEmpty={setIsAmountEmpty}
              />
              <TheirBet multiplier={multiplier} betAmount={betAmount} />
              <Multiplier
                setMultiplier={setMultiplier}
                sliderVal={sliderVal}
                setSliderVal={setSliderVal}
              />
            </div>
            <div className="mt-4 flex flex-row justify-between gap-2">
              <Total betAmount={betAmount} multiplier={multiplier} />
              <PlaceBet />
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  )
}
