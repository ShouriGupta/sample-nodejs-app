var http = require('http');
var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var server = http.createServer(function (request, response) {

    var clientId = "f3dfef1b-e097-4e19-91f6-ee6274875523";
    var clientSecret = "nj8XoXkSVcITV5ldlCbwSZ9Mr0F9JL5+Ebc2dDO5rQA=";
    var vaultUri = "https://unit-test-key-vault.vault.azure.net";

    var authenticator = function (challenge, callback) {
        // Create a new authentication context.
        var context = new AuthenticationContext(challenge.authorization);

        // Use the context to acquire an authentication token.
        return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function (err, tokenResponse) {
            if (err) throw err;
            // Calculate the value to be set in the request's Authorization header and resume the call.
            var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;

            return callback(null, authorizationValue);
        });

    };

    var credentials = new KeyVault.KeyVaultCredentials(authenticator);
    var client = new KeyVault.KeyVaultClient(credentials);

    console.log(client)

    client.createKey(vaultUri, 'yourkey', 'EC', function (err, keyBundle) {
        if (err) {
            console.log("The err : ", err);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Hello World! No" + err);
        }
        else {
            console.log("The key : ", keyBundle);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Hello World! Yes" + keyBundle);
        }
    });


});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
