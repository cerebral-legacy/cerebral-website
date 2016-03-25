function openVideo({input, state}) {
  state.merge({
    videoSrc: input.videoSrc,
    showOverlay: true
  });
}

export default openVideo;
