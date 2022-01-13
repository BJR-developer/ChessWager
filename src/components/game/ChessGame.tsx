import React, { useCallback, useEffect, useState } from "react"
// @ts-ignore
import ndjsonStream from "can-ndjson-stream"
import "react-chessground/dist/styles/chessground.css"
import "../../style/game.scss"
import { PlayerData } from "./PlayerData"
import { GameId } from "../containers/GameId"
// @ts-ignore
import Chessground from "react-chessground"

interface Featured {
  t: string
  d: {
    id: string
    orientation: string //black /white
    players: Player[]
    fen: string
    wc: number
    bc: number
  }
}

interface Player {
  color: string
  user: {
    name: string
    id: string
    title: string
  }
  rating: number
}

interface Props {
  setShowChat: React.Dispatch<any>
}

export const ChessGame: React.FC<Props> = ({ setShowChat }) => {
  const { gameId, setGameId } = GameId.useContainer()

  const [fen, setFen] = useState("")

  const [whiteName, setWhiteName] = useState("")
  const [whiteTime, setWhiteTime] = useState(0)
  const [whiteRating, setWhiteRating] = useState(0)
  const [whiteTitle, setWhiteTitle] = useState("")

  const [blackName, setBlackName] = useState("")
  const [blackTime, setBlackTime] = useState(0)
  const [blackRating, setBlackRating] = useState(0)
  const [blackTitle, setBlackTitle] = useState("")
  const [orientation, setOrientation] = useState("white")

  const updateTitles = useCallback(
    (res: Featured): void => {
      const white: Player | undefined = res.d.players.find(
        (player) => player.color === "white",
      )
      const black: Player | undefined = res.d.players.find(
        (player) => player.color === "black",
      )

      if (black === undefined || white === undefined) return

      setFen(res.d.fen)
      setGameId(res.d.id)
      setOrientation(res.d.orientation)

      if (white.user.title === undefined) setWhiteTitle("")
      setWhiteName(white.user.name)
      setWhiteRating(white.rating)

      if (black.user.title === undefined) setBlackTitle("")
      setBlackName(black.user.name)
      setBlackRating(black.rating)

      return
    },
    [setGameId],
  )

  useEffect(() => {
    fetch("https://lichess.org/api/tv/feed", {
      method: "get",
    })
      .then((data) => ndjsonStream(data.body))
      .then((stream) => {
        const streamReader = stream.getReader()
        streamReader.read().then(async (res: Featured | any) => {
          updateTitles(res.value)
          while (!res || !res.done) {
            res = await streamReader.read()
            if (res.value.t === "fen") {
              setFen(res.value.d.fen)
              setWhiteTime(res.value.d.wc)
              setBlackTime(res.value.d.bc)
            } else {
              updateTitles(res.value)
            }
          }
        })
      })
      .catch(console.error)
  }, [updateTitles])

  const lichessUrl = "https://lichess.org/" + gameId

  return (
    <div
      className="rounded-md overflow-hidden resize-x justify-center flex-col align-middle border-2 bg-secondary-dark dark:bg-primary-dark text-primary-dark dark:text-primary my-10 p-3 w-1/2"
      style={{ minWidth: "14em", maxWidth: "80vh" }}
    >
      <div className="resize flex  w-full h-full justify-center align-middle">
        <div className="flex justify-center flex-col align-middle w-full border-2 border-black">
          <div className="flex justify-center w-full">
            <PlayerData
              side={orientation === "white" ? "black" : "white"}
              title={orientation === "white" ? blackTitle : whiteTitle}
              name={orientation === "white" ? blackName : whiteName}
              time={orientation === "white" ? blackTime : whiteTime}
              rating={orientation === "white" ? blackRating : whiteRating}
              fen={fen}
            />
          </div>
          <div className="aspect-w-1 aspect-h-1">
            <Chessground
              coordinates={false}
              id="chess-board"
              fen={fen}
              orientation={orientation}
              draggable={{ enabled: false }}
              movable={{ free: false }}
              height="100%"
              width="100%"
            />
          </div>
          <div className="flex justify-center">
            <PlayerData
              side={orientation === "white" ? "white" : "black"}
              title={orientation === "black" ? blackTitle : whiteTitle}
              name={orientation === "black" ? blackName : whiteName}
              time={orientation === "black" ? blackTime : whiteTime}
              rating={orientation === "black" ? blackRating : whiteRating}
              fen={fen}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
