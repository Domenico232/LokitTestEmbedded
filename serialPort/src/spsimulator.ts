import { SerialPort, ReadlineParser } from 'serialport';

const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on('open', () => {
  console.log('Serial Port Opened');
});

parser.on('data', (data) => {
  console.log(`Received: ${data}`);

  port.write(`${data}+OK\r\n`, (err) => {
    if (err) {
      return console.error('Error on write: ', err.message);
    }
    console.log('Message sent');
    
  });
});

port.on('error', (err) => {
  console.error('Serial Port Error: ', err.message);
});
