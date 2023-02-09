# Pokemon Battle Buddy
A website designed to help users know Pokemon type effectiveness on both offense and defense without memorizing charts

How to use:
--------
### -- Launch website
1. Open the respository in your selected integrated development environment *(ex. Visual Studio Code)*
2. Run "node index.js" in the terminal *(Requires NodeJS integration)*
3. The port that the app is running on will be displayed in the console with the message "This app is listening on port ___". *(The default port for this app is 3002.)*
4. Open your selected internet browser and go to "http://localhost:${port}" *(ex. http://localhost:3002)*

### -- Attack Section
1. Select the move-type of Pokemon move you would like to use (ex. Fire for Flamethrower)
2. Press the "ATTACK" button at the bottom of the section
3. Read which types will receive 2x, 1/2x, or 0x damage from your selected Attack move
>(Note: if a move type is not listed, your selected move-type will do 1x damage)

### -- Defense Section
1. Select your defending Pokemon's type(s)
>(Note: Currently users may select more than the maximum 2 types a Pokemon can have. The website will only return the results of the first two types selected based on their sequential order shown on the page: 
>* Left to Right 
>* Top to Bottom
2. Press the "DEFEND" button at the bottom of the section
3. Read which attack move-types will do 2x, 1/2x, or 0x to your Pokemon
>(Note: current functionality will return all weaknesses from both selected types, resulting in possible duplication of types in multiple result areas. Future fuctionality to remove duplicates and calculate dual-type resistances is in development.)