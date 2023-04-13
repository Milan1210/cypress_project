const chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
export class Helper{

    
    generateRandomNum(range){
        let counter = 0;
        let result="";
        while(counter<range){
            result += chars.at(Math.floor(Math.random()*chars.length));
            counter++;
        }
        return result;
    }
}