function closeVideo({state}) {
  state.merge({
    videoSrc: null,
    showOverlay: false,
    transitionVideo: false
  });
}

export default closeVideo;
