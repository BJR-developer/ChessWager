import firebase from "firebase/compat/app"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Bet } from "./bet/Bet"

import { WagerForm } from "./wager-form/WagerForm"
import { FirebaseError } from "@firebase/util"
import { GameId } from "../containers/GameId"
import { Auth } from "../containers/Auth"
import { LobbyHeader } from "./LobbyHeader"

const firestore = firebase.firestore()

interface Lobby {
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user1DisplayName: string
  hasUser1Paid: boolean
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  user2DisplayName: string
  hasUser2Paid: boolean
  createdAt: Date
  gameId: string
  timestamp: firebase.firestore.Timestamp
  contractAddress: string
  user1FollowThrough: number[]
  user2FollowThrough: number[]
}

export const BettingLobby: React.FC = () => {
  const { user } = Auth.useContainer()
  const gameIdContainer = GameId.useContainer()

  const lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
    firestore.collection("lobby")
  const query = lobbyRef.where("gameId", "==", gameIdContainer.gameId)
  // .orderBy("createdAt", "desc")

  const [lobby]: [Lobby[] | undefined, boolean, FirebaseError | undefined] =
    useCollectionData(query, { idField: "id" })

  return (
    <div className="lobby flex border-t-2 ">
      <aside className="flex border-2 h-full">
        {/* @todo! add column names allowing sorting */}

        <WagerForm />
      </aside>
      <main className="w-full flex-row ">
        <div className="overflow-y-hidden">
          <LobbyHeader />
          <div className=" overflow-y-hidden h-full ">
            {/* get related-to-user games */}
            {lobby &&
              user &&
              lobby
                .filter(
                  (bet) =>
                    (bet.user1Id === user.uid || bet.user2Id === user.uid) &&
                    bet.gameId !== "",
                )
                .map((bet) => (
                  <Bet
                    className=""
                    key={bet.id}
                    id={bet.id}
                    amount={bet.amount}
                    betSide={bet.betSide}
                    multiplier={bet.multiplier}
                    status={bet.status}
                    user1Id={bet.user1Id}
                    user1Metamask={bet.user1Metamask}
                    user1PhotoURL={bet.user1PhotoURL}
                    user1DisplayName={bet.user1DisplayName}
                    hasUser1Paid={bet.hasUser1Paid}
                    user2Id={bet.user2Id}
                    user2Metamask={bet.user2Metamask}
                    user2PhotoURL={bet.user2PhotoURL}
                    user2DisplayName={bet.user2DisplayName}
                    hasUser2Paid={bet.hasUser2Paid}
                    gameId={bet.gameId}
                    timestamp={bet.timestamp?.seconds}
                    contractAddress={bet.contractAddress}
                    user1FollowThrough={bet.user1FollowThrough}
                    user2FollowThrough={bet.user2FollowThrough}
                  />
                ))}
            {lobby &&
              lobby
                .filter(
                  (bet) =>
                    bet.status === "ready" &&
                    bet.user1Id !== user?.uid &&
                    bet.user2Id !== user?.uid &&
                    bet.gameId !== "",
                )
                .map((bet) => (
                  <Bet
                    className="ready-bet"
                    key={bet.id}
                    id={bet.id}
                    amount={bet.amount}
                    betSide={bet.betSide}
                    multiplier={bet.multiplier}
                    status={bet.status}
                    user1Id={bet.user1Id}
                    user1Metamask={bet.user1Metamask}
                    user1PhotoURL={bet.user1PhotoURL}
                    user1DisplayName={bet.user1DisplayName}
                    hasUser1Paid={bet.hasUser1Paid}
                    user2Id={bet.user2Id}
                    user2Metamask={bet.user2Metamask}
                    user2PhotoURL={bet.user2PhotoURL}
                    user2DisplayName={bet.user2DisplayName}
                    hasUser2Paid={bet.hasUser2Paid}
                    gameId={bet.gameId}
                    timestamp={bet.timestamp?.seconds}
                    contractAddress={bet.contractAddress}
                    user1FollowThrough={bet.user1FollowThrough}
                    user2FollowThrough={bet.user2FollowThrough}
                  />
                ))}
            {lobby &&
              lobby
                .filter(
                  (bet) =>
                    bet.status === "pending" &&
                    bet.user1Id !== user?.uid &&
                    bet.user2Id !== user?.uid &&
                    bet.gameId !== "",
                )
                .map((bet) => (
                  <Bet
                    className="pending-bet"
                    key={bet.id}
                    id={bet.id}
                    amount={bet.amount}
                    betSide={bet.betSide}
                    multiplier={bet.multiplier}
                    status={bet.status}
                    user1Id={bet.user1Id}
                    user1Metamask={bet.user1Metamask}
                    user1PhotoURL={bet.user1PhotoURL}
                    user1DisplayName={bet.user1DisplayName}
                    hasUser1Paid={bet.hasUser1Paid}
                    user2Id={bet.user2Id}
                    user2Metamask={bet.user2Metamask}
                    user2PhotoURL={bet.user2PhotoURL}
                    user2DisplayName={bet.user2DisplayName}
                    hasUser2Paid={bet.hasUser2Paid}
                    gameId={bet.gameId}
                    timestamp={bet.timestamp?.seconds}
                    contractAddress={bet.contractAddress}
                    user1FollowThrough={bet.user1FollowThrough}
                    user2FollowThrough={bet.user2FollowThrough}
                  />
                ))}
          </div>
        </div>
      </main>
    </div>
  )
}
