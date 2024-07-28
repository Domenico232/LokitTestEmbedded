const { ipcRenderer } = require('electron');

document.querySelectorAll('.led').forEach((led, index) => {
led.addEventListener('click', () => {
    const state = led.classList.contains('on') ? 0 : 1;
    const command = `LED${index + 1}${state}`;
    console.log(`Sending: ${command}`);
    ipcRenderer.send('serial-command', command);
});
});

ipcRenderer.on('serial-data', (event: any, data: string) => {
const match = data.match(/LED(\d)(\d)\+OK/);
if (match) {
    const ledIndex = parseInt(match[1]) - 1;
    const state = parseInt(match[2]) === 1 ? 'green' : 'red';
    const led = document.querySelectorAll('.led')[ledIndex] as HTMLElement;
    led.classList.toggle('on', state === 'green');
    led.style.backgroundColor = state;
}
});
