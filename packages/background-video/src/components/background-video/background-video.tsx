import { Component, Prop, h, Element } from "@stencil/core";
// TODO: Check how this loads
import "objectFitPolyfill/dist/objectFitPolyfill.min.js";
// import { format } from "../../utils/utils";

declare var objectFitPolyfill: Function;

const videoTypeMap = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg"
};

@Component({
  tag: "ssui-background-video",
  styleUrl: "background-video.css",
  shadow: true
})
export class BackgroundVideo {
  /**
   * The Host html element
   */
  @Element() el: HTMLElement;

  /**
   * Should video autoplay
   */
  @Prop() autoplay: boolean;

  /**
   * Should video loop
   */
  @Prop() loop: boolean;

  /**
   * Should video be muted
   */
  @Prop() muted: boolean;

  /**
   * Should video be muted
   */
  @Prop() preload: string;

  /**
   * Video poster while loading
   */
  @Prop() poster: string;

  /**
   * Should video show controls
   */
  @Prop() controls: boolean;

  /**
   * The overlay background
   */
  @Prop() overlayBackground: string;

  /**
   * The overlay background
   */
  @Prop() overlayOpacity: string;

  /**
   * The object fit of the video
   * Defaults to 'cover'
   */
  @Prop() videoFit: string = "cover";

  /**
   * The object position of the video
   * Defaults to 'center center'
   */
  @Prop() videoPosition: string = "center center";

  /**
   * The video url(s) seperated by spaces
   */
  @Prop() videoSrcs: string;

  private determineVideoType = (url: string) => {
    let key = Object.keys(videoTypeMap).find(k => url.endsWith(k));

    if (key) {
      return videoTypeMap[key];
    }

    return undefined;
  };

  componentDidLoad() {
    objectFitPolyfill(
      this.el.shadowRoot.querySelectorAll(
        "[data-object-fit],[data-object-position]"
      )
    );
  }

  render() {
    return (
      <div class="video-container">
        {this.overlayBackground ? (
          <div
            class="overlay"
            style={{
              background: this.overlayBackground,
              opacity: this.overlayOpacity
            }}
          />
        ) : null}

        <video
          class="video"
          autoplay={this.autoplay}
          loop={this.loop}
          muted={this.muted}
          poster={this.poster}
          preload={this.preload}
          controls={this.controls}
          style={{
            objectFit: this.videoFit,
            objectPosition: this.videoPosition
          }}
          data-object-fit={this.videoFit}
          data-object-position={this.videoPosition}
        >
          {this.videoSrcs.split(" ").map(vs => (
            <source src={vs} type={this.determineVideoType(vs)} />
          ))}
        </video>

        <div class="video-content">
          <slot name="content" />
        </div>
      </div>
    );
  }
}
