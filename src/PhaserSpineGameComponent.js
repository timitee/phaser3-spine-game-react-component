import Phaser from "phaser"
import "phaser/plugins/spine/dist/SpinePluginDebug.js"
import React, { useEffect, useState } from "react"
import pngSPINE from "./owl/owl-pro.png"
import atlasSPINE from "./owl/owl-pro.atlas"
import jsonSPINE from "./owl/owl-pro.json"

function preload() {
  this.load.image("_owl", pngSPINE, false)
  this.load.spine("owl", jsonSPINE, atlasSPINE, false)
}

function create() {
  this.SPINE = this.add.spine(170, 200, "owl", "idle", true).setScale(0.3)
  this.game.events.emit("show", true)
}

export const PhaserGameComponent = () => {
  const [isReady, setReady] = useState(false)
  useEffect(() => {
    let config = {
      height: 300,
      width: 400,
      parent: "phaser-game",
      plugins: {
        scene: [
          { key: "SpinePlugin", plugin: window.SpinePlugin, mapping: "spine" },
        ],
      },
      physics: { default: "arcade" },
      scene: { preload, create },
      scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      transparent: true,
      type: Phaser.AUTO,
    }
    let game = new Phaser.Game(config)
    game.plugins.installScenePlugin("SpinePlugin", window.SpinePlugin, "spine")
    game.events.on("show", setReady)
    game.events.on("destroy", () => {
      console.log("!")
      // game.plugins.removeScenePlugin("SpinePlugin")
      setReady(false)
    })
    return () => {
      game.destroy(true)
      setReady(false)
    }
  }, [])
  return <div id="phaser-game" className={isReady ? "visible" : "invisible"} />
}
