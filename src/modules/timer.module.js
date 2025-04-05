
import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("timer", "Таймер");
    this.time = "00:00:00";
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
    
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'timerModalContent_confirmBtn';
    confirmBtn.textContent = 'Подтвердить';
    
   
    confirmBtn.addEventListener('click', () => {
      this.time = timeInput.value; 
      document.body.removeChild(modalOverlay);
      this.startTimer(); 
    });
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(timeLabel);
    modalContent.appendChild(timeInput);
    modalContent.appendChild(confirmBtn);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    // обработчик для закрытия по клику вне окна
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

    const removeElements = () => {
      if (timerBlock) document.body.removeChild(timerBlock);
      if (modalOverlay) document.body.removeChild(modalOverlay);
  };

    closeBtn.addEventListener('click', () => {
      removeElements();
    });
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

  startTimer() {
    const timeParts = this.time.split(":");
    
    const [hours, minutes, seconds] = timeParts.map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timerBlock = document.createElement('div');
    timerBlock.className = 'timerBlock'
    timerBlock.textContent = this.converterTimeToConclision([hours, minutes, seconds]);
    document.body.appendChild(timerBlock);

    const timerInterval = setInterval(() => {
      totalSeconds -= 1;
      const time = this.secondsToTime(totalSeconds);
      timerBlock.textContent = this.converterTimeToConclision(time);
      if(totalSeconds < 4) {
        timerBlock.classList.add('timerBlock-end');
      }
      if(totalSeconds === 0) {
        clearInterval(timerInterval);
        this.deleteTimer();
      }
    }, 1000)
  }


  trigger() {
    this.createModal()
 


  }
}
