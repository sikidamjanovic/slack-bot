/*

"StAuth10065: I Sinisa Damjanovic, 000343682 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else."

*/

var Bot = require('slackbots')
var yelpAPI = require('yelp-api')
var apiKey = 'H7WBaaLGLQdPj5oz3A1z8gP9sQlHXEc4-qSa9NS1zSHrvhZNtMPIEjhzEn1fWCo-hyinl1cvdCgYuGe8SdLxEPxN61MFjfMOgpOnj1TNkCvy-pUT3dNHOrd6CSS1W3Yx'
var yelp = new yelpAPI(apiKey);

//Create a bot

var settings = {
    token: 'xoxb-448410365684-448426987092-MIjq8ImX7Knw0jXLqVrbsq43',
    name: 'yelpbot'
}

var bot = new Bot(settings)
let params = [{ location: '20008' }];

bot.on('message', function(data){

    if (data.channel == "CD7JW1YHM"){

        if(data.type == 'message'){

            var split = data.text.split(" ")

            // Split the input text
            var commandSplit = split.splice(0,1)
            commandSplit.push(split.join(' '))

            //Initialize the command and the paramater
            var param = commandSplit[1]
            var command = commandSplit[0]

            console.log(param)
            console.log(typeof(param))

            //----------- COMMAND 1: NEARBY ----------------------------

            if(command.includes('Nearby')){
                yelp.query('businesses/search?', [{limit: '5', location: '' + param + '', limit: '5'}])
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    for (let x = 0; x < 5; x++) {
                        response.push(output.businesses[x].name + '\n' + 'Rating: '+ output.businesses[x].rating + '\n'
                        + 'Phone: ' + output.businesses[x].phone + '\n' + output.businesses[x].url + '\n' + '----------------------------' 
                        + '\n \n')
                    }
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', 'No Nearby Restaurants Can Be Found')
                });
            }

            //----------- COMMAND 2: CLOSEBY ----------------------------

            if(command.includes('Closeby')){

                var coordinates = param.split(' ')
                var long = parseFloat(coordinates[0])
                var lat = parseFloat(coordinates[1])

                console.log(long)
                console.log(lat)

                yelp.query('businesses/search?', [{longitude: '' + long + '', latitude: '' + lat + '', limit: '5'}])
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    for (let x = 0; x < 5; x++) {
                        response.push(output.businesses[x].name + '\n' + 'Rating: '+ output.businesses[x].rating + '\n'
                        + 'Phone: ' + output.businesses[x].phone + '\n' + output.businesses[x].url + '\n' + '----------------------------' 
                        + '\n \n')
                    }
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', 'No Closeby Restaurants Can Be Found')
                });
            }

            //----------- COMMAND 3: Top Xnumber ----------------------------

            if(command.includes('Top')){

                var param_split = param.split(" ")

                var limit_address_split = param_split.splice(0,1)
                limit_address_split.push(param_split.join(' '))

                //Initialize the command and the paramater
                var top_limit = limit_address_split[0]
                var top_location = limit_address_split[1]

                yelp.query('businesses/search?categories=restaurant', [{limit: '' + top_limit + '', location: '' + top_location + '',sort_by: 'rating'}])
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    for (let x = 0; x < top_limit; x++) {
                        response.push(output.businesses[x].name + '\n' + 'Rating: '+ output.businesses[x].rating + '\n'
                        + 'Phone: ' + output.businesses[x].phone + '\n' + output.businesses[x].url + '\n' + '----------------------------' 
                        + '\n \n')
                    }
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', 'No Nearby Restaurants Can Be Found')
                });
            }


            //----------- COMMAND 4: Closest Category ----------------------------

            if(command.includes('Closest')){

                var param_split = param.split(" ")

                var limit_address_split = param_split.splice(0,1)
                limit_address_split.push(param_split.join(' '))

                //Initialize the command and the paramater
                var closest_limit = limit_address_split[0]
                var closest_location = limit_address_split[1]

                yelp.query('businesses/search?', [{limit: '' + closest_limit + '', location: '' + closest_location + '', sort_by: 'distance'}])
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    for (let x = 0; x < closest_limit; x++) {
                        response.push(output.businesses[x].name + '\n' + 'Rating: '+ output.businesses[x].rating + '\n'
                        + 'Phone: ' + output.businesses[x].phone + '\n' + output.businesses[x].url + '\n' + '----------------------------' 
                        + '\n \n')
                    }
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', 'No Nearby Restaurants Can Be Found')
                });
            }

            //----------- COMMAND 5: FindMe Category ----------------------------

            if(command.includes('FindMe')){

                var param_split = param.split(" ")

                var category_address_split = param_split.splice(0,1)
                category_address_split.push(param_split.join(' '))

                //Initialize the command and the paramater
                var category = category_address_split[0]
                var find_location = category_address_split[1]

                yelp.query('businesses/search?limit=5&categories='+category+'&location='+find_location)
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    for (let x = 0; x < output.businesses.length; x++) {
                        response.push(output.businesses[x].name + '\n' + 'Rating: '+ output.businesses[x].rating + '\n'
                        + 'Phone: ' + output.businesses[x].phone + '\n' + output.businesses[x].url + '\n' + '----------------------------' 
                        + '\n \n')
                    }
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', 'No' +category+ ' Restaurants Can Be Found')
                });
            }

            //----------- COMMAND 6: Reviews ----------------------------

            if(command.includes('Reviews')){

                var param_split = param.split(" ")

                var restaurant_address_split = param_split.splice(0,2)
                restaurant_address_split.push(param_split.join(' '))

                //Initialize the command and the paramater
                var restaurant = restaurant_address_split[0] + ' ' + restaurant_address_split[1]
                var review_location = restaurant_address_split[2]

                console.log(restaurant)
                console.log(review_location)

                yelp.query('businesses/search?limit=1&alias='+restaurant+'&', [{location: '' + review_location + ''}])
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    for (let x = 0; x < 5; x++) {
                        response.push(output.businesses[x].name + '\n' + 'Rating: '+ output.businesses[x].rating + '\n'
                        + 'Phone: ' + output.businesses[x].phone + '\n' + output.businesses[x].url + '\n' + '----------------------------' 
                        + '\n \n')
                    }
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', ''+restaurant+' Cannot Be Found')
                });
            }

            //----------- COMMAND 7: SearchByPhone ----------------------------

            if(command.includes('SearchByPhone')){

                yelp.query('businesses/search/phone', [{phone: '' + '+'+ param + ''}])
                .then(data => {

                    var response = ['Heres What I Found: \n \n']
                    var output = JSON.parse(data) 
                    
                    response.push(output.businesses[0].name + '\n' + 'Rating: '+ output.businesses[0].rating + '\n'
                        + 'Phone: ' + output.businesses[0].phone + '\n' + output.businesses[0].url + '\n' + '----------------------------' 
                        + '\n \n')
    
                    bot.postMessageToChannel('general', response.toString())

                })
                .catch(err => {
                    bot.postMessageToChannel('general', 'No Restaurant With Phone Number ' +param+ ' can be found.')
                });
            }
        }
    }
})