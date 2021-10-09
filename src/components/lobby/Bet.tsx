import React from "react"

import Card from "react-bootstrap/Card"
import "../../config"
import firebase from "firebase/compat/app"
import "../../style/lobby.css"
import "firebase/compat/functions"
import Buttons from "./Buttons"


interface Props {
  user: firebase.User | null | undefined
  className: string
  lobbyRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  id: string
  amount: number
  betSide: string
  multiplier: number
  status: string
  user1Id: string
  user1Metamask: string
  user1PhotoURL: string
  user2Id: string
  user2Metamask: string
  user2PhotoURL: string
  createdAt: Date
  gameId: string
  auth: firebase.auth.Auth
}

const Bet: React.FC<Props> = ({
  user,
  className,
  lobbyRef,
  id,
  amount,
  betSide,
  multiplier,
  status,
  user1Id,
  user1Metamask,
  user1PhotoURL,
  user2Id,
  user2Metamask,
  user2PhotoURL,
  createdAt,
  gameId,
  auth,
}) => {
  const potSize = amount + amount * multiplier

  const isPending =
    auth.currentUser &&
    // (user1Id === auth.currentUser.uid || user2Id === auth.currentUser.uid) && // what was I thinking?
    status === "pending"

  return (
    <div>
      <Card>
        <Card.Body className={`${className} bet`}>
          <Buttons
            user={user}
            id={id}
            status={status}
            user1Id={user1Id}
            user2Id={user2Id}
            auth={auth}
          />
          <img src={user1PhotoURL} alt="" />
          <span>{status}</span>
          {/* accept button, only for user1 */}

          <span>{`${amount} eth`}</span>
          <span>{`${betSide}`}</span>
          <span>{`x${multiplier}`}</span>
          <span>{`pot size ${potSize}`}</span>
          {user2PhotoURL && <img src={user2PhotoURL} alt="" />}
        </Card.Body>
      </Card>
      <>
        {/* leftoff@todo show conditions of bet and prompt metamask 
          accept and cancel buttons
          cancel would make bet go back to ready
        */}

      </>
    </div>
  )
}

export default Bet
