/** @format */
const http = require('http');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const fetch = (queryParam) => {
  const myAPIKey = process.env.API_KEY;
  const baseUrl = `http://api.weatherapi.com/v1/current.json?q=${queryParam}&key=${myAPIKey}`;
  http
    .get(baseUrl, (res) => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        console.log(`Status Code - ${statusCode}`);
        return;
      }
      res.setEncoding('utf-8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        const parsedData = JSON.parse(rawData);
        const { location, current } = parsedData;
        console.log(
          `Страна/Город - ${location.country}/${location.name}, Время - ${location.localtime}, Температура - ${current.temp_c}, Заметка - ${current.condition.text}`
        );
      });
    })
    .on('error', (err) => {
      console.log(err);
    });
};

const weatherForecast = () => {
  rl.question('Witch city ? ', (str) => {
    fetch(str);
    rl.close();
  });
};

weatherForecast();
