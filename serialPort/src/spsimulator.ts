import { SerialPort, ReadlineParser } from 'serialport';

const port = new SerialPort({ path: 'COM1', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on('open', () => {
    console.log('Serial Port Opened');
});

parser.on('data', (data: string) => {
    console.log(`Received: ${data}`);
    port.write(`${data}+OK\r\n`);
});
