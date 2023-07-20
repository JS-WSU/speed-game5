import express from "express";
import Record from "../db/models/RecordSchema.mjs";

const router = express.Router();

const cards = [
    {
        name: "AceHearts",
        value: 1,
        inUse: false        
    },
    {
        name: "TwoHearts",
        value: 2,
        inUse: false
    },
    {
        name: "ThreeHearts",
        value: 3,
        inUse: false
    },
    {
        name: "FourHearts",
        value: 4,
        inUse: false
    },
    {
        name: "FiveHearts",
        value: 5,
        inUse: false
    },
    {
        name: "SixHearts",
        value: 6,
        inUse: false
    },
    {
        name: "SevenHearts",
        value: 7,
        inUse: false
    },
    {
        name: "EightHearts",
        value: 8,
        inUse: false
    },
    {
        name: "NineHearts",
        value: 9,
        inUse: false
    },
    {
        name: "TenHearts",
        value: 10,
        inUse: false
    },
    {
        name: "JackHearts",
        value: 11,
        inUse: false
    },
    {
        name: "QueenHearts",
        value: 12,
        inUse: false
    },
    {
        name: "KingHearts",
        value: 13,
        inUse: false
    },
    {
        name: "AceDiamond",
        value: 1,
        inUse: false        
    },
    {
        name: "TwoDiamond",
        value: 2,
        inUse: false
    },
    {
        name: "ThreeDiamond",
        value: 3,
        inUse: false
    },
    {
        name: "FourDiamond",
        value: 4,
        inUse: false
    },
    {
        name: "FiveDiamond",
        value: 5,
        inUse: false
    },
    {
        name: "SixDiamond",
        value: 6,
        inUse: false
    },
    {
        name: "SevenDiamond",
        value: 7,
        inUse: false
    },
    {
        name: "EightDiamond",
        value: 8,
        inUse: false
    },
    {
        name: "NineDiamond",
        value: 9,
        inUse: false
    },
    {
        name: "TenDiamond",
        value: 10,
        inUse: false
    },
    {
        name: "JackDiamond",
        value: 11,
        inUse: false
    },
    {
        name: "QueenDiamond",
        value: 12,
        inUse: false
    },
    {
        name: "KingDiamond",
        value: 13,
        inUse: false
    },
    {
        name: "AceSpades",
        value: 1,
        inUse: false        
    },
    {
        name: "TwoSpades",
        value: 2,
        inUse: false
    },
    {
        name: "ThreeSpades",
        value: 3,
        inUse: false
    },
    {
        name: "FourSpades",
        value: 4,
        inUse: false
    },
    {
        name: "FiveSpades",
        value: 5,
        inUse: false
    },
    {
        name: "SixSpades",
        value: 6,
        inUse: false
    },
    {
        name: "SevenSpades",
        value: 7,
        inUse: false
    },
    {
        name: "EightSpades",
        value: 8,
        inUse: false
    },
    {
        name: "NineSpades",
        value: 9,
        inUse: false
    },
    {
        name: "TenSpades",
        value: 10,
        inUse: false
    },
    {
        name: "JackSpades",
        value: 11,
        inUse: false
    },
    {
        name: "QueenSpades",
        value: 12,
        inUse: false
    },
    {
        name: "KingSpades",
        value: 13,
        inUse: false
    },
    {
        name: "AceClubs",
        value: 1,
        inUse: false        
    },
    {
        name: "TwoClubs",
        value: 2,
        inUse: false
    },
    {
        name: "ThreeClubs",
        value: 3,
        inUse: false
    },
    {
        name: "FourClubs",
        value: 4,
        inUse: false
    },
    {
        name: "FiveClubs",
        value: 5,
        inUse: false
    },
    {
        name: "SixClubs",
        value: 6,
        inUse: false
    },
    {
        name: "SevenClubs",
        value: 7,
        inUse: false
    },
    {
        name: "EightClubs",
        value: 8,
        inUse: false
    },
    {
        name: "NineClubs",
        value: 9,
        inUse: false
    },
    {
        name: "TenClubs",
        value: 10,
        inUse: false
    },
    {
        name: "JackClubs",
        value: 11,
        inUse: false
    },
    {
        name: "QueenClubs",
        value: 12,
        inUse: false
    },
    {
        name: "KingClubs",
        value: 13,
        inUse: false
    }]

router.get("/getDeck", async (req, res) => {
    let deck = cards;
    let deck1 = [];
    let deck2 = [];
    
    for (let i = 0; i < deck.length / 2; i++){
        let choice = Math.floor(Math.random() * 51);
        
        while(deck[choice].inUse){
            choice++;
            if (choice >= deck.length) {
                choice = 0;
            }          
        }     
        deck[choice].inUse = true;
        deck1.push(deck[choice]); 
    }
    for (let i = 0; i < deck.length / 2; i++){
        let choice = Math.floor(Math.random() * 51);
        
        while(deck[choice].inUse){
            choice++;
            if (choice >= deck.length) {
                choice = 0;
            }               
        }
        deck[choice].inUse = true;
        deck2[i] = deck[choice]; 
    }

   
    res.status(200).send({deck1, deck2});

});


  
  export default router;