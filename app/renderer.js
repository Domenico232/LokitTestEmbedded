
document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.button');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const isOff = button.classList.toggle('off');
        const buttonNumber = button.textContent;
        const state = isOff ? '0' : '1';
        console.log(`Pulsante ${buttonNumber} è ${state}`);

        window.electron.send('button-click', buttonNumber, state); 
    });
    });
  });