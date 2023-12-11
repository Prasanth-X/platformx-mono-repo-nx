declare global {
  interface Window {
    bc: any;
  }
}
window.bc = window.bc || {};
class Brightcove {
  playerObj: any;

  vidId: string;

  videoData: any;

  subscribeEvents: any;

  options: any;

  constructor() {
    this.playerObj = {};
    this.vidId = "";
    this.videoData = { VideoID: "", AccountID: "", PlayerID: "" };
    this.subscribeEvents = undefined;
    this.options = {};
  }

  brightCoveWebPlayer(
    vidId: string,
    videoData: { VideoID: string; AccountID: string; PlayerID: string },
    options: any,
    callback: any,
  ) {
    this.playerObj = {};
    this.vidId = vidId;
    this.videoData = videoData;
    this.addPlayer();
    this.options = { ...this.getDefaultOptions(), ...options };
    this.subscribeEvents = callback;
  }

  getDefaultOptions() {
    return {
      html5: {
        hls: {
          smoothQualityChange: true,
        },
      },
      autoplay: true,
      bigPlayButton: false,
      debug: false,
    };
  }

  addPlayer() {
    let playerHTML;
    console.log("playlist", this.videoData.PlaylistID, this.videoData);
    if (this.videoData.PlaylistID === "playlist") {
      playerHTML =
        '<div class="vjs-playlist-player-container" style="width: 100%; height: inherit;"><video-js id="myPlayerID-' +
        this.vidId +
        '" data-playlist-id="' +
        this.videoData.VideoID +
        '"  data-account="' +
        this.videoData.AccountID +
        '" data-player="' +
        this.videoData.PlayerID +
        '" data-embed="default" class="video-js" controls style="width:100%;height:100%;"></video-js></div>';
    } else {
      // Dynamically build the player video element
      playerHTML =
        '<video-js id="myPlayerID-' +
        this.vidId +
        '" data-video-id="' +
        this.videoData.VideoID +
        '"  data-account="' +
        this.videoData.AccountID +
        '" data-player="' +
        this.videoData.PlayerID +
        '" data-embed="default" class="video-js" controls style="width:100%;height:100%;"></video-js>';
    }
    // Inject the player code into the DOM
    const iframe = document.querySelectorAll("iframe:not(#productsummary)");
    let mainContainer: any = "";
    let mainWindow: any = window;
    let mainDocument: any = document;
    if (iframe && iframe.length > 0) {
      let vidIdInsideIframe: any = false;
      iframe?.forEach((item: any) => {
        const iWindow = item?.contentWindow;
        const iDocument = iWindow?.document;
        const container = iDocument?.getElementById(this.vidId);
        if (container) {
          vidIdInsideIframe = true;
          mainContainer = container;
          mainWindow = iWindow;
          mainDocument = iDocument;
        }
      });
      if (!vidIdInsideIframe) {
        const container = document.getElementById(this.vidId);
        vidIdInsideIframe = false;
        mainContainer = container;
      }
    } else {
      const container = document.getElementById(this.vidId);
      if (container) {
        mainContainer = container;
      }
    }

    if (mainContainer) {
      mainContainer.innerHTML = playerHTML;
      const id = "brightcove-player";
      if (!mainDocument.getElementById(id)) {
        // Add and execute the player script tag
        const s = document.createElement("script");
        s.id = id;
        s.src =
          "https://players.brightcove.net/" +
          this.videoData.AccountID +
          "/" +
          this.videoData.PlayerID +
          "_default/index.min.js";
        // Add the script tag to the document
        mainDocument?.body?.appendChild(s);
        // Call a function to play the video once player's JavaScropt loaded
        s.onload = () => this.callback(mainWindow);
      } else {
        this.callback(mainWindow);
      }
    }
  }

  callback(mainWindow: { bc: any }) {
    this.playerObj = mainWindow?.bc(`myPlayerID-${this.vidId}`, this.options);
    this.subscribeEvents?.(this.playerObj);
    // const self: object = this.playerObj;
    // self['on']('loadedmetadata', function () {
    // self['muted'](true);
    // self['play']();
    // });
    if (this.options.autoplay) {
      if (this.options.mute) this.playerObj?.muted(true);
      this.playerObj.play();
    }
  }

  closeVideo() {
    if (this.playerObj) {
      this.playerObj?.dispose?.();
    }
  }
}

export default Brightcove;
