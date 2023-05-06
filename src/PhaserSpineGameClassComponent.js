import Phaser from "phaser"
import "phaser/plugins/spine/dist/SpinePluginDebug.js"
import  { Component } from "react"
import pngSPINE from "./owl/owl-pro.png"
import atlasSPINE from "./owl/owl-pro.atlas"
import jsonSPINE from "./owl/owl-pro.json"

function preload() {
  this.load.image("_owl", pngSPINE, false)
  this.load.spine("owl", jsonSPINE, atlasSPINE, false)
}

function create() {
  this.SPINE = this.add.spine(170, 200, "owl", "idle", true).setScale(0.2)
  this.game.events.emit("show", true)
}

export  class PhaserGameComponent extends Component {
  componentDidMount() {
    // let  {
    //   GAMECONFIG,
    //   SCENECONFIG,
    //   CountDownScene,
    //   PausedScene,
    //   HUDScene,
    //   LockDownScene,
    //   ModalConfirmScene,
    //   PreGameScene,
    //   PreloadingScene,
    //   WaveCompleteScene,
    //   TypingGameScene,
    //   GameOverScene,
    //   funPlugin,
    //   globalPlugins,
    // } = this.props   
    const cleanUp  = () => { // mainGame
      // Maybe don't clean up this.
      // mainGame.plugins.removeScenePlugin("SpinePlugin")
      // Do this to remove the old div.
      // setReady(false)
    }
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
    new Phaser.Game(config)
    // Maybe not here.
    // game.plugins.installScenePlugin("SpinePlugin", window.SpinePlugin, "spine")
    // game.events.on("show", setReady)
    // Maybe don't clean up here.
    game.events.on("destroy", cleanUp)
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate")
    return false;
  }

  render() {
    return <div id="phaser-game" />
  }
}


export default PhaserGameComponent
