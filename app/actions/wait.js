function wait({output}) {
  setTimeout(output, 50);
}

wait.async = true;

export default wait;
