import Phaser from "phaser"
import React, { useEffect, useState } from "react"
import happyImage from "./happyImage.png"

function preload() {
  this.load.image("HAPPY", happyImage)
}
function create() {
  this.HAPPY = this.add
    .image(100, 100, "HAPPY")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(100, 100)
  this.game.events.emit("show", true)
}
function update(time) {
  this.HAPPY.setRotation(time / 1000)
}

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
