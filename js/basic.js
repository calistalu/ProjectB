
window.addEventListener("scroll", function() {
    const scrolled = window.scrollY;
    const translationX = scrolled;  
    const translationY = scrolled;  
    document.getElementById("box2").style.transform = "translate(" + translationX + "px, " + translationY + "px) ";
  });

  document.addEventListener('DOMContentLoaded', function() {
    const endOfPage = document.getElementById('box5');
    const contactBtn = document.getElementById('contactBtn');
    contactBtn.addEventListener('click', function() {
        endOfPage.scrollIntoView({ behavior: 'smooth' });
    });
});

function redirect() {
  window.location.href = 'index2.html';
}

var audio = new Audio('audio/light.wav');
audio.loop = true; 
var audio2= new Audio('audio/pop.wav')

function playMusic() {
  audio.play();
}

function pauseMusic() {
  audio.pause();
}

document.getElementById('musicBtn').addEventListener('click', function() {
  if (audio.paused) {
    playMusic();
    document.getElementById('musicBtn').textContent = 'Pause Music';
  } else {
    pauseMusic();
    document.getElementById('musicBtn').textContent = 'Listen';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var frames = [];
  for (let i = 1; i <= 4; i++) {
    frames.push(document.querySelector('#f' + i));
    frames[i - 1].addEventListener('mouseenter', function() {
      audio2.play();
    });
  }
});
