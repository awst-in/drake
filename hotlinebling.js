const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;


let text = "You used to call me on my cell phone Late night when you need my love Call me on my cell phone Late night when you need my love And I know when that hotline bling That can only mean one thing I know when that hotline bling That can only mean one thing Ever since I left the city, you Got a reputation for yourself now Everybody knows and I feel left out Girl, you got me down, you got me stressed out 'Cause ever since I left the city, you Started wearing less and goin' out more Glasses of champagne out on the dance floor Hangin' with some girls I've never seen before Ever since I left the city, you, you, you You and me, we just don't get along You make me feel like I did you wrong Going places where you don't belong Ever since I left the city, you You got exactly what you asked for Running out of pages in your passport Hanging with some girls I've never seen before These days, all I do is Wonder if you're bendin' over backwards for someone else Wonder if you're rollin' up a Backwoods for someone else Doing things I taught you, gettin' nasty for someone else You don't need no one else You don't need nobody else, no Why you never alone? Why you always touchin' road? Used to always stay at home, be a good girl You was in the zone Yeah, you should just be yourself Right now, you're someone else";

// function parseText(text){
    //     return text.toLowerCase().replace(/[^a-z\s]/gi, '').split(' ');
    // }
    function parseText(text){
        return text.toLowerCase()/*.replace(/[^a-z\s]/gi, '')*/.split(' ');
    }
    
    
    function generateWordPairs(text){
        const obj = {};
        for(let i = 0; i < text.length - 2; i++){
            let currentWord = text[i];
            //-if text[i+1] exists, check if text[i+2] exists. If both exist, return both with a space. If only text[i+1] exists, return text[i+1], if neither exist, return undefined
            // let nextWord = text[i + 1] != undefined ? text[i + 2] != undefined ? text[i + 1] + ' ' + text[i + 2] : text[i + 1] : undefined;
            // if (nextWord === undefined){ continue }
            let nextWord = text[i + 1] + ' ' + text[i + 2]
            if(currentWord in obj && !obj[currentWord].includes(nextWord)){
                obj[currentWord].push(nextWord) 
            }else{
                obj[currentWord] = [nextWord]
            }
        }
        let currentWord = text[text.length - 2]
        let nextWord = text[text.length - 1]
        if(currentWord in obj && !obj[currentWord].includes(nextWord)){
            obj[currentWord].push(nextWord) 
        }else{
            obj[currentWord] = [nextWord]
        }
        console.log(obj)
        return obj;
    }
    
    function getRandomKey(obj){
        let keys = Object.keys(obj)
        let randomNum = Math.random() * keys.length
        let randomIdx = Math.floor(randomNum);
        return keys[randomIdx]
    }
    
    
    function writeLine(obj, lineLength){
        let line = [];
        let currentWord = '' 
        for(let i = 0; i < lineLength; i++){
            if(currentWord === ''){
                currentWord = getRandomKey(obj);
            } else {
                currentWord = getPairedWord(obj, currentWord)
            }
            line.push(currentWord)
        }
        return generateSentence(line);
    }
    
    function getPairedWord(obj, key){
        let words = key.split(' ');
        let lastWord = words[words.length - 1];
        let myMarkovWords = obj[lastWord];
        if(myMarkovWords === undefined){
            return getRandomKey(obj)
        }
        let randomNum = Math.random() * myMarkovWords.length
        let randomIdx = Math.floor(randomNum);
        return myMarkovWords[randomIdx]
    }
    
    function generateSentence(sentenceArr){
        let sentence = sentenceArr[0];
        for(let i = 1; i < sentenceArr.length; i++){
            sentence += (' ' + sentenceArr[i])
        }
        return sentence;
    }
    
    function generatePoem(corpus, numOfLines){
        let poem = '';
        let wordPairs = generateWordPairs(parseText(corpus))
        for(let i = 0; i < numOfLines; i++){
            poem += (writeLine(wordPairs, getReasonableNumber()) + "\n");
        }
        return poem;
    }
    
    function getReasonableNumber(){
        return Math.floor(Math.random() * (8 - 3) + 3)
    }
    console.log(generatePoem(text, 6))
    
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(generatePoem(text, 6));
});
    
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
