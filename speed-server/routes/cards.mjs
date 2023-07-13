import express from "express";
import Record from "../db/models/RecordSchema.mjs";

const router = express.Router();

router.get("/shuffle", async (req, res) => {
    const cards = [];
    cards[0] = {
        name: "AceHearts",
        value: 1,
        inUse: false        
    };
    cards[1] = {
        name: "TwoHearts",
        value: 2,
        inUse: false
    };
    cards[2] = {
        name: "ThreeHearts",
        value: 3,
        inUse: false
    };
    cards[3] = {
        name: "FourHearts",
        value: 4,
        inUse: false
    };
    cards[4] = {
        name: "FiveHearts",
        value: 5,
        inUse: false
    };
    cards[5] = {
        name: "SixHearts",
        value: 6,
        inUse: false
    };
    cards[6] = {
        name: "SevenHearts",
        value: 7,
        inUse: false
    };
    cards[7] = {
        name: "EightHearts",
        value: 8,
        inUse: false
    };
    cards[8] = {
        name: "NineHearts",
        value: 9,
        inUse: false
    };
    cards[9] = {
        name: "TenHearts",
        value: 10,
        inUse: false
    };
    cards[10] = {
        name: "JackHearts",
        value: 11,
        inUse: false
    };
    cards[11] = {
        name: "QueenHearts",
        value: 12,
        inUse: false
    };
    cards[12] = {
        name: "KingHearts",
        value: 13,
        inUse: false
    };
    cards[13] = {
        name: "AceDiamond",
        value: 1,
        inUse: false        
    };
    cards[14] = {
        name: "TwoDiamond",
        value: 2,
        inUse: false
    };
    cards[15] = {
        name: "ThreeDiamond",
        value: 3,
        inUse: false
    };
    cards[16] = {
        name: "FourDiamond",
        value: 4,
        inUse: false
    };
    cards[17] = {
        name: "FiveDiamond",
        value: 5,
        inUse: false
    };
    cards[18] = {
        name: "SixDiamond",
        value: 6,
        inUse: false
    };
    cards[19] = {
        name: "SevenDiamond",
        value: 7,
        inUse: false
    };
    cards[20] = {
        name: "EightDiamond",
        value: 8,
        inUse: false
    };
    cards[21] = {
        name: "NineDiamond",
        value: 9,
        inUse: false
    };
    cards[22] = {
        name: "TenDiamond",
        value: 10,
        inUse: false
    };
    cards[23] = {
        name: "JackDiamond",
        value: 11,
        inUse: false
    };
    cards[24] = {
        name: "QueenDiamond",
        value: 12,
        inUse: false
    };
    cards[25] = {
        name: "KingDiamond",
        value: 13,
        inUse: false
    };
    cards[26] = {
        name: "AceSpades",
        value: 1,
        inUse: false        
    };
    cards[27] = {
        name: "TwoSpades",
        value: 2,
        inUse: false
    };
    cards[28] = {
        name: "ThreeSpades",
        value: 3,
        inUse: false
    };
    cards[29] = {
        name: "FourSpades",
        value: 4,
        inUse: false
    };
    cards[30] = {
        name: "FiveSpades",
        value: 5,
        inUse: false
    };
    cards[31] = {
        name: "SixSpades",
        value: 6,
        inUse: false
    };
    cards[32] = {
        name: "SevenSpades",
        value: 7,
        inUse: false
    };
    cards[33] = {
        name: "EightSpades",
        value: 8,
        inUse: false
    };
    cards[34] = {
        name: "NineSpades",
        value: 9,
        inUse: false
    };
    cards[35] = {
        name: "TenSpades",
        value: 10,
        inUse: false
    };
    cards[36] = {
        name: "JackSpades",
        value: 11,
        inUse: false
    };
    cards[37] = {
        name: "QueenSpades",
        value: 12,
        inUse: false
    };
    cards[38] = {
        name: "KingSpades",
        value: 13,
        inUse: false
    };
    cards[39] = {
        name: "AceClubs",
        value: 1,
        inUse: false        
    };
    cards[40] = {
        name: "TwoClubs",
        value: 2,
        inUse: false
    };
    cards[41] = {
        name: "ThreeClubs",
        value: 3,
        inUse: false
    };
    cards[42] = {
        name: "FourClubs",
        value: 4,
        inUse: false
    };
    cards[43] = {
        name: "FiveClubs",
        value: 5,
        inUse: false
    };
    cards[44] = {
        name: "SixClubs",
        value: 6,
        inUse: false
    };
    cards[45] = {
        name: "SevenClubs",
        value: 7,
        inUse: false
    };
    cards[46] = {
        name: "EightClubs",
        value: 8,
        inUse: false
    };
    cards[47] = {
        name: "NineClubs",
        value: 9,
        inUse: false
    };
    cards[48] = {
        name: "TenClubs",
        value: 10,
        inUse: false
    };
    cards[49] = {
        name: "JackClubs",
        value: 11,
        inUse: false
    };
    cards[50] = {
        name: "QueenClubs",
        value: 12,
        inUse: false
    };
    cards[51] = {
        name: "KingClubs",
        value: 13,
        inUse: false
    };

    res.status(200).send(record);
  });
  
  export default router;