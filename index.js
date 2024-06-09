//initialise npm-       npm init

// inquirer for user input-             npm i inquirer
import inquirer from 'inquirer';

// chalk for colorful console output-           npm i chalk
import chalk from 'chalk';


// axios for making HTTP requests-      npm i axios
import axios from 'axios';

inquirer
    .prompt([
        {
            "name": "userLocationInput",
            "message": "Enter your location: "
        }
    ])
    .then((answers) => {
        // console.log(answers);
        // console.log(answers.userLocationInput);
        const userInp = answers.userLocationInput;

        //use axios:
        async function makeRequest(location) {
            try {
                const apiKey = 'enter_your_api_key';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`;

                // Make the request
                const response = await axios.get(url);
                // console.log(response);
                const weatherDescrip=response.data.weather[0].description //object see what prints..weather is array so [0]

                const minTemp= response.data.main.temp_min //temperature min
                const maxTemp= response.data.main.temp_max //temperature max
                const humidTemp= response.data.main.humidity //humidity
                const visibTemp= response.data.visibility //visibility
                const windTemp= response.data.wind.speed //wind speed

                //to print weather on console:
                console.log(chalk.blue('The weather in ') + chalk.bold(userInp) + chalk.blue(' is: ') + chalk.bold.magenta(weatherDescrip)+chalk.bgWhite.black(`\nMinimum Temperature is: ${minTemp}°C\nMaximum Temperature is: ${maxTemp}°C\nHumidity: ${humidTemp}\nVisibility is: ${visibTemp}\nWind speed is ${windTemp}`));
    
            } catch (error) {
                console.error(chalk.red("Error fetching data: " + error));
            }

        }

        makeRequest(userInp);

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong");
        }
    });

