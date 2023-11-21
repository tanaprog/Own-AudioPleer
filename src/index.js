const song = document.getElementById('song');
const progress = document.getElementById('progress');
const backward = document.getElementById('backward');
const ctrlIcon = document.getElementById('ctrlIcon');
const forward = document.getElementById('forward');
const title = document.getElementById('title');
const description = document.getElementById('description');

const music = [
    {
        title: 'Space Melody',
        autor: 'Vize and Alan Wolker',
        path: 'media/space-melody.mp3'
    },
    {
        title: 'Road to hell',
        autor: 'Cris Rea',
        path: 'media/road-to-hell.mp3'
    },
    {
        title: 'Till I Come',
        autor: 'ATB',
        path: 'media/till-i-come.mp3'
    },
    {
        title: 'Living Without You',
        autor: 'Rasmus',
        path: 'media/living-without-you.mp3'
    },
];

let musicIndex = 0;

function init() {

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

    function loadSong(musicIndex) {
        title.innerHTML = music[musicIndex].title;
        description.innerHTML = music[musicIndex].autor;
        song.src = music[musicIndex].path;
    }

    function clickForward() {
        musicIndex++;

        if (musicIndex > music.length - 1) {
            musicIndex = 0;
            loadSong(musicIndex);
        }
        else {
            loadSong(musicIndex);
            song.play();
        }

        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }

    function clickBackward() {
        musicIndex--;

        if (musicIndex < 0) {
            musicIndex = music.length - 1;
            loadSong(musicIndex);
        }
        else {
            loadSong(musicIndex);
            song.play();
        }

        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
    }

    ctrlIcon.addEventListener('click', playPause);
    forward.addEventListener('click', clickForward);
    backward.addEventListener('click', clickBackward);
    song.addEventListener('ended', clickForward);

    song.onloadedmetadata = function () {
        progress.max = song.duration;
        progress.value = song.currentTime;
    }

    progress.onchange = function () {
        song.play();
        song.currentTime = progress.value;
    }

    if (song) {
        setInterval(() => {
            progress.value = song.currentTime;
        }, 500);
    }

    loadSong(musicIndex);

};

init();




