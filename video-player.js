const VideoPlayer = {};

VideoPlayer.toggleVisibility = (id) => {
    const element = document.getElementById(id);
    const attr = element.getAttribute("data-state");
    const newState = (attr == 'none' ? 'block' : 'none');

    element.setAttribute("data-state", newState);
};
 
VideoPlayer.setVideoElement = (videoId) => {
    VideoPlayer.videoElement = document.getElementById(videoId);
}

VideoPlayer.setPlaybackSpeedEvent = (sliderId) => {
    const slider = document.getElementById(sliderId);

    slider.onchange = () => {
        VideoPlayer.videoElement.playbackRate = slider.value;
    };
};

VideoPlayer.setVolumeEvent = (sliderId) => {
    const slider = document.getElementById(sliderId);
    
    slider.onchange = () => {
        VideoPlayer.videoElement.volume = (slider.value / 100);
    };
};

VideoPlayer.setCurrentTimeEvent = (buttonId) => {
    const button = document.getElementById(buttonId);
    const attr = parseInt(button.getAttribute("data-state"));

    button.onclick = () => {
        VideoPlayer.videoElement.currentTime += attr;
    };
}

VideoPlayer.setPlayPauseEvent = (buttonId) => {
    const button = document.getElementById(buttonId);

    button.onclick = () => {
        if (VideoPlayer.videoElement.paused)
            VideoPlayer.videoElement.play();
        else
            VideoPlayer.videoElement.pause();
    };
}

VideoPlayer.setCurrentTimeInfoEvent = (containerId) => {
    const container = document.getElementById(containerId);

    VideoPlayer.videoElement.addEventListener('timeupdate', () => {
        container.innerHTML = VideoPlayer.videoElement.currentTime;
    });
}

VideoPlayer.setTimelineEvent = (timelineId) => {
    const timeline = document.getElementById(timelineId);

    VideoPlayer.videoElement.addEventListener('timeupdate', () => {
        const percent = (VideoPlayer.videoElement.currentTime / VideoPlayer.videoElement.duration) * 100;
        timeline.value = percent;
    });
}

VideoPlayer.setFullscreenEvent = (buttonId, containerId) => {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);

    button.addEventListener('click', () => {
        if (document.fullscreenElement)
        {
            document.exitFullscreen();
            container.setAttribute("data-state", "minimized");
        }
        else
        {
            container.requestFullscreen();
            container.setAttribute("data-state", "maximized");
        }
    });
}

VideoPlayer.setOnHoverEvent = (containerId) => {
    const timeoutTime = 2000;
    const container = document.getElementById(containerId);
    const elements = document.getElementsByClassName("video-hover-event");
    
    const setAttributes = (state) => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute("data-state", state);
        }
    }
    
    container.onmouseenter = () => {
        setAttributes("flex");
    }

    container.onmouseleave = () => {
        setAttributes("none");
    }

    container.onmousemove = () => {
        if (VideoPlayer.hoverTimeout != null) {
            clearTimeout(VideoPlayer.hoverTimeout);
        }

        if (elements[0].getAttribute("data-state") == "none") {
            setAttributes("flex");
        }

        VideoPlayer.hoverTimeout = setTimeout(() => {
            setAttributes("none");
        }, timeoutTime);
    }
};

