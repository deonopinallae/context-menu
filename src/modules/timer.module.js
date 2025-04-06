import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("timer", "Таймер");
    this.time = "00:00:00";
    this.tickSound = this.createAudio('https://www.soundjay.com/buttons/sounds/button-21.mp3');
    this.timeEndSound = this.createAudio('https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3');
    this.backgrounds = {
      morning: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      day: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
      evening: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 50%, #6a3093 100%)',
      night: 'linear-gradient(to right, #000428, #004e92)'
    };
    
    this.currentBackground = 'day';
    this.stars = [];
    this.timerInterval = null;
    this.sun = null;
    this.moon = null;
  }
  

  createAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.preload = 'auto';
    audio.volume = 0.5;
    return audio;
  }

  createModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'timerModalOverlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'timerModalContent';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'timerModalContent_header';
    modalHeader.textContent = 'Таймер';
    
    const timeLabel = document.createElement('label');
    timeLabel.className = 'timerModalContent_label';
    timeLabel.textContent = 'Введите время';
    timeLabel.setAttribute('for', 'timeInput');
    
    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.step = '1';
    timeInput.className = 'timerModalContent_input';
    timeInput.id = 'timeInput';
    timeInput.value = '00:00:00';
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'timerModalContent_error';
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'timerModalContent_confirmBtn';
    confirmBtn.textContent = 'Подтвердить';
    
    confirmBtn.addEventListener('click', () => {
      const timeValue = timeInput.value;
      if (!timeValue || timeValue === '00:00:00') {
        errorMessage.textContent = 'Пожалуйста, установите время';
        errorMessage.style.display = 'block';
        return;
      }
      
      const [hours, minutes, seconds] = timeValue.split(':').map(Number);
      if (hours === 0 && minutes === 0 && seconds === 0) {
        errorMessage.textContent = 'Время не может быть 00:00:00';
        errorMessage.style.display = 'block';
        return;
      }
      
      this.time = timeValue; 
      document.body.removeChild(modalOverlay);
      this.startTimer(); 
    });
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(timeLabel);
    modalContent.appendChild(timeInput);
    modalContent.appendChild(errorMessage);
    modalContent.appendChild(confirmBtn);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    });
  }

  deleteTimer() {
    this.createModal();
    const modalOverlay = document.querySelector('.timerModalOverlay');
    const modalContent = modalOverlay.querySelector('.timerModalContent');
    const timerBlock = document.querySelector('.timerBlock');
    modalContent.innerHTML = '';
    const modalHeader = document.createElement('div');
    modalHeader.className = 'timerModalContent_header';
    modalHeader.textContent = 'Время истекло';
        
    const closeBtn = document.createElement('button');
    closeBtn.className = 'timerModalContent_confirmBtn';
    closeBtn.textContent = 'Закрыть';
    
    this.timeEndSound.loop = true;
    this.timeEndSound.currentTime = 0;
    this.timeEndSound.play();

    const removeElements = () => {
      if (timerBlock) document.body.removeChild(timerBlock);
      if (modalOverlay) document.body.removeChild(modalOverlay);
      this.timeEndSound.pause();
      this.clearCelestialBodies();
      this.removeStars();
    };

    closeBtn.addEventListener('click', removeElements);
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        removeElements();
      }
    });    
       
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(closeBtn);
  }

  secondsToTime(secondsTimer) {
    const hours = Math.floor(secondsTimer / 3600);
    const remainingSeconds = secondsTimer % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return [hours, minutes, seconds];
  }

  converterTimeToConclision(time) {
    const format = time.map(num => {
      const n = Number(num);
      return n < 10 ? `0${n}` : `${n}`;
    });
    return format.join(':')
  }
  createStars() {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = 'star';
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = Math.random();
      document.body.appendChild(star);
      this.stars.push(star)
    }
  }

  removeStars() {
    this.stars.forEach(star => {
      if (star && star.parentNode) {
        star.parentNode.removeChild(star);
      }
    });
    this.stars = [];
  }

  clearCelestialBodies() {
    if (this.sun && this.sun.parentNode) {
      this.sun.parentNode.removeChild(this.sun);
      this.sun = null;
    }
    if (this.moon && this.moon.parentNode) {
      this.moon.parentNode.removeChild(this.moon);
      this.moon = null;
    }
  }

  createCelestialBodies(isDay) {
    this.clearCelestialBodies();
    
    if (isDay) {
      this.sun = document.createElement('div');
      this.sun.className = 'sun';
      document.body.appendChild(this.sun);
    } else {
      this.moon = document.createElement('div');
      this.moon.className = 'moon';
      document.body.appendChild(this.moon);
    }
  }
  updateBackground(hours) {
    let newBackground = this.currentBackground;
    
    if (hours >= 5 && hours < 10) {
      newBackground = 'morning';
    } else if (hours >= 10 && hours < 18) {
      newBackground = 'day';
    } else if (hours >= 18 && hours < 22) {
      newBackground = 'evening';
    } else {
      newBackground = 'night';
    }
    
    if (newBackground !== this.currentBackground) {
      this.currentBackground = newBackground;
      document.body.style.background = this.backgrounds[newBackground];
      
      // Управление звёздами и небесными телами
      if (newBackground === 'night') {
        this.createStars();
        this.createCelestialBodies(false);
      } else {
        this.removeStars();
        this.createCelestialBodies(true);
      }
    }
  }


  startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    const timerLust = document.querySelector('.timerBlock');
    if(timerLust) {
      timerLust.remove();
    }
    this.clearCelestialBodies();
    this.removeStars();


    const timeParts = this.time.split(":");
    const [hours, minutes, seconds] = timeParts.map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    if (totalSeconds <= 0) {
      this.deleteTimer();
      return;
    }

    const timerBlock = document.createElement('div');
    timerBlock.className = 'timerBlock'
    timerBlock.textContent = this.converterTimeToConclision([hours, minutes, seconds]);
    document.body.appendChild(timerBlock);


    this.updateBackground(hours);

    const timerInterval = setInterval(() => {


      totalSeconds -= 1;
      if (totalSeconds < 0) {
        clearInterval(timerInterval);
        this.deleteTimer();
        return;
      }
      
      const [h, m, s]= this.secondsToTime(totalSeconds);
     
      
      timerBlock.textContent = this.converterTimeToConclision([h, m, s]);
      if (s === 0) {
        this.updateBackground(h);
      }
      if(totalSeconds < 4 && totalSeconds > 0) {
        timerBlock.classList.add('timerBlock-end');
        this.tickSound.currentTime = 0;
        this.tickSound.play();
      }
      
      if(totalSeconds === 0) {
        clearInterval(timerInterval);
        this.deleteTimer();
      }
    }, 1000)
  }

  trigger() {
    this.createModal();
    
  }
}