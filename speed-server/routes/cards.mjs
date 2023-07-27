import express from "express";
import Record from "../db/models/RecordSchema.mjs";

const router = express.Router();

const cards = [
    {
        name: "AceHearts",
        value: 1,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/ace_of_hearts.png"       
    },
    {
        name: "TwoHearts",
        value: 2,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/2_of_hearts.png"
    },
    {
        name: "ThreeHearts",
        value: 3,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/3_of_hearts.png"
    },
    {
        name: "FourHearts",
        value: 4,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/4_of_hearts.png"
    },
    {
        name: "FiveHearts",
        value: 5,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/5_of_hearts.png"
    },
    {
        name: "SixHearts",
        value: 6,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/6_of_hearts.png"
    },
    {
        name: "SevenHearts",
        value: 7,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/7_of_hearts.png"
    },
    {
        name: "EightHearts",
        value: 8,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/8_of_hearts.png"
    },
    {
        name: "NineHearts",
        value: 9,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/9_of_hearts.png"
    },
    {
        name: "TenHearts",
        value: 10,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/10_of_hearts.png"
    },
    {
        name: "JackHearts",
        value: 11,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/jack_of_hearts.png"
    },
    {
        name: "QueenHearts",
        value: 12,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/queen_of_hearts.png"
    },
    {
        name: "KingHearts",
        value: 13,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/king_of_hearts.png"
    },
    {
        name: "AceDiamond",
        value: 1,
        inUse: false ,
        src: "/public/img/PNG-cards-1.3/ace_of_diamonds.png"      
    },
    {
        name: "TwoDiamond",
        value: 2,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/2_of_diamonds.png"
    },
    {
        name: "ThreeDiamond",
        value: 3,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/3_of_diamonds.png"
    },
    {
        name: "FourDiamond",
        value: 4,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/4_of_diamonds.png"
    },
    {
        name: "FiveDiamond",
        value: 5,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/5_of_diamonds.png"
    },
    {
        name: "SixDiamond",
        value: 6,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/6_of_diamonds.png"
    },
    {
        name: "SevenDiamond",
        value: 7,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/7_of_diamonds.png"
    },
    {
        name: "EightDiamond",
        value: 8,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/8_of_diamonds.png"
    },
    {
        name: "NineDiamond",
        value: 9,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/9_of_diamonds.png"
    },
    {
        name: "TenDiamond",
        value: 10,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/10_of_diamonds.png"
    },
    {
        name: "JackDiamond",
        value: 11,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/jack_of_diamonds.png"
    },
    {
        name: "QueenDiamond",
        value: 12,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/queen_of_diamonds.png"
    },
    {
        name: "KingDiamond",
        value: 13,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/king_of_diamonds.png"
    },
    {
        name: "AceSpades",
        value: 1,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/ace_of_spades.png"    
    },
    {
        name: "TwoSpades",
        value: 2,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/2_of_spades.png"
    },
    {
        name: "ThreeSpades",
        value: 3,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/3_of_spades.png"
    },
    {
        name: "FourSpades",
        value: 4,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/4_of_spades.png"
    },
    {
        name: "FiveSpades",
        value: 5,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/5_of_spades.png"
    },
    {
        name: "SixSpades",
        value: 6,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/6_of_spades.png"
    },
    {
        name: "SevenSpades",
        value: 7,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/7_of_spades.png"
    },
    {
        name: "EightSpades",
        value: 8,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/8_of_spades.png"
    },
    {
        name: "NineSpades",
        value: 9,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/9_of_spades.png"
    },
    {
        name: "TenSpades",
        value: 10,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/10_of_spades.png"
    },
    {
        name: "JackSpades",
        value: 11,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/jack_of_spades.png"
    },
    {
        name: "QueenSpades",
        value: 12,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/queen_of_spades.png"
    },
    {
        name: "KingSpades",
        value: 13,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/king_of_spades.png"
    },
    {
        name: "AceClubs",
        value: 1,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/ace_of_clubs.png"    
    },
    {
        name: "TwoClubs",
        value: 2,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/2_of_clubs.png"
    },
    {
        name: "ThreeClubs",
        value: 3,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/3_of_clubs.png"
    },
    {
        name: "FourClubs",
        value: 4,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/4_of_clubs.png"
    },
    {
        name: "FiveClubs",
        value: 5,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/5_of_clubs.png"
    },
    {
        name: "SixClubs",
        value: 6,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/6_of_clubs.png"
    },
    {
        name: "SevenClubs",
        value: 7,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/7_of_clubs.png"
    },
    {
        name: "EightClubs",
        value: 8,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/8_of_clubs.png"
    },
    {
        name: "NineClubs",
        value: 9,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/9_of_clubs.png"
    },
    {
        name: "TenClubs",
        value: 10,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/10_of_clubs.png"
    },
    {
        name: "JackClubs",
        value: 11,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/jack_of_clubs.png"
    },
    {
        name: "QueenClubs",
        value: 12,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/queen_of_clubs.png"
    },
    {
        name: "KingClubs",
        value: 13,
        inUse: false,
        src: "/public/img/PNG-cards-1.3/king_of_clubs.png"
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