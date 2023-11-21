const song = document.getElementById('song');
const progress = document.getElementById('progress');
const backward = document.getElementById('backward');
const ctrlIcon = document.getElementById('ctrlIcon');
const forward = document.getElementById('forward');
const title = document.getElementById('title');
const description = document.getElementById('description');

const music = ['Space Melody', 'Road to hell', 'Till I Come', 'Living Without You'];
const autor = ['Vize and Alan Wolker', 'Cris Rea', 'ATB', 'Rasmus'];

let musicIndex = 0;
let autorIndex = 0;

function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    }
    else {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }
}

ctrlIcon.addEventListener('click', playPause);

function loadSong(treck) {
    title.innerHTML = treck;
    song.src = `media/${treck}.mp3`;
    description.innerHTML = autor[autorIndex];
}

loadSong(music[musicIndex]);

function clickForward() {
    musicIndex++;
    autorIndex++;

    if (musicIndex > music.length - 1) {
        musicIndex = -1;
    }
    else {
        loadSong(music[musicIndex]);
        song.play();
    }

    if (autorIndex > autor.length - 1) {
        autorIndex = -1;
    }
}

forward.addEventListener('click', clickForward);

function clickBackward() {
    musicIndex--;
    autorIndex--;

    if (musicIndex < 0) {
        musicIndex = music.length;
    }
    else {
        loadSong(music[musicIndex]);
        song.play();
    }

    if (autorIndex < 0) {
        autorIndex = autor.length;
    }
}

backward.addEventListener('click', clickBackward);

song.addEventListener('ended', clickForward);

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

if (song.play) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
}


