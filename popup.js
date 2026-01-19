document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("speed-slider");
  const display = document.getElementById("speed-display");

  // Listen for slider changes
  slider.addEventListener("input", function () {
    const speed = parseFloat(slider.value);
    const displaySpeed = speed.toFixed(1);

    // choose a single, well-ordered message for the selected speed
    let msg = "Normal";
    if (speed >= 5.0) {
      msg = "God help you";
    } else if (speed >= 4.0) {
      msg = "Steady on my good chap!";
    } else if (speed >= 2.0) {
      msg = "Tally ho!";
    } else {
      msg = "";
    }

    display.textContent = `${displaySpeed}x - ${msg}`;

    // Send the script to the active tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setPlaybackRate,
        args: [speed], // Pass the slider value as an argument
      });
    });
  });
});

// This function is executed inside the web page context
function setPlaybackRate(rate) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = rate;
  } else {
    console.log("No video found on this page.");
  }
}