import { Game } from "phaser"
import React, { useEffect, useState } from "react"
import { warmupRobotPlugin, gameConfig } from "@funtyper/robot"

export const PhaserGameComponent = () => {
  const [isReady, setReady] = useState(false)
  useEffect(() => {
    let game = new Game({
      ...gameConfig,
      parent: "RobotAnimation",
    })
    game.plugins.install(...Object.values(warmupRobotPlugin))
    game.events.on("ready", () => setReady(true))
    return () => {
      setReady(false)
      game.destroy(true)
    }
  }, [])
  return (
    <div style={{ background: "#ff0000", padding: "10px", height: gameConfig.height }}>
      <div id="RobotAnimation" className={isReady ? "visible" : "invisible"} />
    </div>
  )
}
