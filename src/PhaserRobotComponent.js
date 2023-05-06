import { Game, Scale } from "phaser"
import React, { useEffect, useState } from "react"
import { warmupRobotPlugin, gameConfig } from "@funtyper/robot"


export const PhaserGameComponent = () => {
  const [isReady, setReady] = useState(false)
  useEffect(() => {
    let config = {
      height: 200,
      width: 200,
      physics: { default: "arcade" },
      scene: { preload, create, update },
      scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      transparent: true,
      type: Phaser.AUTO,
    }
    let game = new Phaser.Game(config)
    game.events.on("show", setReady)
    return () => {
      setReady(false)
      game.destroy(true)
    }
  }, [])
  return <div id="phaser-game" className={isReady ? "visible" : "invisible"} />
}
