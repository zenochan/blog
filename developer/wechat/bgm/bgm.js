var $forbid = document.getElementById("forbid");
var audio = document.getElementById('bgMusic');
var iconMusic = document.getElementsByClassName('icon-music')[0];
var iconForbidMusic = document.getElementsByClassName('icon-forbidMusic')[0];

function audioAutoPlay(audio) {
  document.addEventListener("WeixinJSBridgeReady", function () {
    audio.play();
  }, false);
  document.addEventListener('YixinJSBridgeReady', function () {
    audio.play();
  }, false);
}

audioAutoPlay(audio);


function musicPause() {
  audio.pause();
  iconMusic.style.display = 'none';
  iconForbidMusic.style.display = 'block';
}

function musicPlay() {
  audio.play();
  iconMusic.style.display = 'block';
  iconForbidMusic.style.display = 'none';
}
