# Assembly Museum Visitors

# cURL commands to test the API

Get the Museum visitors with ignore case\n
curl --location --request GET 'http://localhost:3000/api/visitors?date=1491268718000&ignore=hellman_quon'

Get the Museum visitors without ignore case\n
curl --location --request GET 'http://localhost:3000/api/visitors?date=1491268718000'

# Sample data to import and test the API's from MongoDB
assembly.json has the sample data for testing. It can be used to import data into the Mongo DB collection called museumvisitors (as per the model name). 

# To start the server
Run "node app.js" from the root folder

# To run the test cases
Run "npm run test-unit:xml". This will generate a test results file along with code covergae results.