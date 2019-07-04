import { Component, Prop, h } from "@stencil/core";
// import { format } from "../../utils/utils";

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
   * The overlay background
   */
  @Prop() overlayBackground: string;

  /**
   * The overlay background
   */
  @Prop() overlayOpacity: string;

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

  render() {
    return (
      <div class="video-container">
        {console.log(this)}
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
          preload={this.preload}
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
