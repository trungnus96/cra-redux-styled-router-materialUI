import React, { Component, useEffect } from "react";

import Button from "@material-ui/core/Button";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
const env = {
  REACT_APP_FIREBASE_APPID: "1:983043845801:web:27358f73eb679f474003b8",
  REACT_APP_VERCEL_ORG_ID: "team_BsC0XBztx8i1Zkn3aBd2pD5l",
  REACT_APP_VERCEL_GIT_COMMIT_SHA: "6610fdc751dbb65b3bdd5a147881697c7099f04c",
  REACT_APP_VERCEL_URL:
    "loot-explorers-frontend-3yhdbo7to-lootexplorers.vercel.app",
  REACT_APP_ENV: "production",
  REACT_APP_VERCEL_ENV: "production",
  REACT_APP_FIREBASE_AUTHDOMAIN: "lootexplorers-feff0.firebaseapp.com",
  REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: "cjinghong",
  REACT_APP_VERCEL_GIT_PROVIDER: "github",
  REACT_APP_VERCEL_PROJECT_ID: "prj_2uMHMrj34xmOfPHzxmQcjjQWY6NU",
  REACT_APP_MAINNET_URI:
    "https://mainnet.infura.io/v3/4c9a458399ae41599b7295a08eee0798",
  REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME: "Chan Jing Hong",
  REACT_APP_ENCRYPTION_KEY: "Earl does not exist",
  REACT_APP_FIREBASE_MESSAGINGSENDERID: "983043845801",
  REACT_APP_VERCEL_GIT_REPO_OWNER: "cjinghong",
  REACT_APP_VERCEL_GIT_REPO_SLUG: "loot-explorers-frontend",
  REACT_APP_TESTNET_URI:
    "https://rinkeby.infura.io/v3/4c9a458399ae41599b7295a08eee0798",
  REACT_APP_FIREBASE_STORAGEBUCKET: "lootexplorers-feff0.appspot.com",
  REACT_APP_FIREBASE_APIKEY: "AIzaSyBj98OrNx3LCYVDh9tWBZ54IMQ5VaAocjE",
  REACT_APP_VERCEL_GIT_COMMIT_MESSAGE: "updated puzzle key",
  REACT_APP_VERCEL_ARTIFACTS_TOKEN:
    "artifacts:eyJkZXBsb3ltZW50SWQiOiJkcGxfRW9VQ1Y3eTh2REtORmVIYWFrYlBLRm1ab1VHTSIsIm93bmVySWQiOiJ0ZWFtX0JzQzBYQnp0eDhpMVprbjNhQmQycEQ1bCIsInRpY2tldCI6ImdxRjB6UWNJb1dPUzJTQmtjR3hmUlc5VlExWTNlVGgyUkV0T1JtVklZV0ZyWWxCTFJtMWFiMVZIVGExQlVFbGZRVkpVU1VaQlExUlRHQU1hOUtVVG5vZ0NEN2N0RVgrdmtVMHRlUEk9In0=",
  REACT_APP_FIREBASE_PROJECTID: "lootexplorers-feff0",
  REACT_APP_VERCEL_GIT_REPO_ID: "407426434",
  REACT_APP_VERCEL_ARTIFACTS_OWNER: "team_BsC0XBztx8i1Zkn3aBd2pD5l",
  REACT_APP_VERCEL_GIT_COMMIT_REF: "master",
};

const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_FIREBASE_STORAGEBUCKET,
  REACT_APP_FIREBASE_MESSAGINGSENDERID,
  REACT_APP_FIREBASE_APPID,
} = env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const winners = [
  {
    puzzle: "apocalypse,rage,storm,rage",
    date: { seconds: 1639602262, nanoseconds: 935000000 },
    discord: "4zero5 (Jon)#0952",
  },
  {
    puzzle: "despair,colossal,despair,rage",
    discord: "AdmiralSnaxbar#4428",
    date: { seconds: 1639602642, nanoseconds: 854000000 },
  },
  {
    puzzle: "colossal,despair,apocalypse,colossal",
    discord: "AshleyLW226#4418",
    date: { seconds: 1639602506, nanoseconds: 458000000 },
  },
  {
    discord: "BDC - Ryan#1969",
    puzzle: "skeleton,psychic,luminescence,rage",
    date: { seconds: 1639602552, nanoseconds: 113000000 },
  },
  {
    puzzle: "apocalypse,skeleton,colossal,skeleton",
    discord: "BeastYourWorld#7995",
    date: { seconds: 1639602117, nanoseconds: 832000000 },
  },
  {
    discord: "Connor#0246",
    date: { seconds: 1639602528, nanoseconds: 879000000 },
    puzzle: "beast,psychic,luminescence,apocalypse",
  },
  {
    discord: "Cornflakes#6808",
    puzzle: "psychic,skeleton,psychic,beast",
    date: { seconds: 1639604866, nanoseconds: 848000000 },
  },
  {
    discord: "DayDreamCrusher#9024",
    puzzle: "beast,storm,despair,despair",
    date: { seconds: 1639602270, nanoseconds: 721000000 },
  },
  {
    date: { seconds: 1639603369, nanoseconds: 164000000 },
    discord: "Deathstrike#4507",
    puzzle: "despair,storm,despair,psychic",
  },
  {
    puzzle: "luminescence,psychic,luminescence,skeleton",
    discord: "Dread#8436",
    date: { seconds: 1639604913, nanoseconds: 964000000 },
  },
  {
    puzzle: "rage,skeleton,psychic,luminescence",
    discord: "Emiliano Naiaretti",
    date: { seconds: 1639602659, nanoseconds: 541000000 },
  },
  {
    date: { seconds: 1639602811, nanoseconds: 747000000 },
    puzzle: "skeleton,storm,storm,colossal",
    discord: "Ev#2748",
  },
  {
    date: { seconds: 1639602602, nanoseconds: 326000000 },
    discord: "EyesForward",
    puzzle: "rage,storm,luminescence,apocalypse",
  },
  {
    discord: "EyesForward#2085",
    date: { seconds: 1639604706, nanoseconds: 306000000 },
    puzzle: "storm,colossal,storm,luminescence",
  },
  {
    date: { seconds: 1639602655, nanoseconds: 568000000 },
    puzzle: "beast,storm,psychic,storm",
    discord: "Huyen Cutie#8667",
  },
  {
    discord: "La Pugne#2916",
    puzzle: "beast,beast,storm,skeleton",
    date: { seconds: 1639602553, nanoseconds: 818000000 },
  },
  {
    discord: "Nate#1617",
    puzzle: "colossal,apocalypse,rage,storm",
    date: { seconds: 1639602589, nanoseconds: 269000000 },
  },
  {
    date: { seconds: 1639604899, nanoseconds: 783000000 },
    discord: "Pocket_Change#9348",
    puzzle: "psychic,despair,skeleton,storm",
  },
  {
    puzzle: "luminescence,rage,psychic,despair",
    discord: "Puroof#0926",
    date: { seconds: 1639604600, nanoseconds: 6000000 },
  },
  {
    date: { seconds: 1639602522, nanoseconds: 417000000 },
    discord: "Scoot#0123",
    puzzle: "luminescence,skeleton,apocalypse,despair",
  },
  {
    date: { seconds: 1639602536, nanoseconds: 858000000 },
    discord: "Warren#6666",
    puzzle: "colossal,storm,apocalypse,storm",
  },
  {
    date: { seconds: 1639604764, nanoseconds: 39000000 },
    puzzle: "despair,beast,beast,apocalypse",
    discord: "Yuniayeti#4502",
  },
  {
    discord: "Zach#4653",
    puzzle: "luminescence,luminescence,despair,colossal",
    date: { seconds: 1639602486, nanoseconds: 351000000 },
  },
  {
    date: { seconds: 1639602565, nanoseconds: 901000000 },
    discord: "Zin#4627",
    puzzle: "despair,psychic,colossal,skeleton",
  },
  {
    date: { seconds: 1639604902, nanoseconds: 259000000 },
    discord: "adderoll#9332",
    puzzle: "skeleton,beast,despair,luminescence",
  },
  {
    puzzle: "storm,beast,colossal,beast",
    discord: "aidas#3764",
    date: { seconds: 1639604761, nanoseconds: 390000000 },
  },
  {
    discord: "cryptogm44#9043",
    date: { seconds: 1639602508, nanoseconds: 750000000 },
    puzzle: "colossal,skeleton,storm,despair",
  },
  {
    discord: "deadfellaz03#0786",
    puzzle: "skeleton,storm,luminescence,luminescence",
    date: { seconds: 1639602498, nanoseconds: 32000000 },
  },
  {
    date: { seconds: 1639602606, nanoseconds: 686000000 },
    puzzle: "storm,beast,beast,rage",
    discord: "elchapo2004#7758",
  },
  {
    discord: "fein2me2",
    date: { seconds: 1639602519, nanoseconds: 704000000 },
    puzzle: "storm,colossal,luminescence,despair",
  },
  {
    puzzle: "apocalypse,rage,skeleton,luminescence",
    date: { seconds: 1639602516, nanoseconds: 520000000 },
    discord: "hasbaby#4639",
  },
  {
    puzzle: "despair,colossal,despair,luminescence",
    date: { seconds: 1639602583, nanoseconds: 169000000 },
    discord: "henrywward#2277",
  },
  {
    discord: "jengsta87#7374",
    date: { seconds: 1639602534, nanoseconds: 974000000 },
    puzzle: "apocalypse,beast,storm,storm",
  },
  {
    discord: "jony72#6650",
    puzzle: "rage,apocalypse,beast,skeleton",
    date: { seconds: 1639604582, nanoseconds: 296000000 },
  },
  {
    discord: "killua_kun#7249",
    puzzle: "skeleton,skeleton,skeleton,luminescence",
    date: { seconds: 1639604649, nanoseconds: 913000000 },
  },
  {
    date: { seconds: 1639605378, nanoseconds: 9000000 },
    puzzle: "psychic,rage,despair,luminescence",
    discord: "kiretanaka#2234",
  },
  {
    discord: "lemonsq#6762",
    puzzle: "luminescence,skeleton,storm,storm",
    date: { seconds: 1639604673, nanoseconds: 6000000 },
  },
  {
    date: { seconds: 1639602568, nanoseconds: 925000000 },
    discord: "littlehogan#4498",
    puzzle: "rage,storm,despair,rage",
  },
  {
    puzzle: "apocalypse,skeleton,colossal,skeleton",
    date: { seconds: 1639604852, nanoseconds: 678000000 },
    discord: "nfthunter#0159",
  },
  {
    date: { seconds: 1639604674, nanoseconds: 705000000 },
    puzzle: "rage,psychic,rage,despair",
    discord: "nftplay#0037",
  },
  {
    date: { seconds: 1639602601, nanoseconds: 856000000 },
    puzzle: "apocalypse,skeleton,apocalypse,storm",
    discord: "ohmers#9757",
  },
  {
    puzzle: "luminescence,despair,colossal,luminescence",
    discord: "soundwave#8753",
    date: { seconds: 1639602386, nanoseconds: 663000000 },
  },
  {
    discord: "swilner#0001",
    date: { seconds: 1639602546, nanoseconds: 849000000 },
    puzzle: "luminescence,skeleton,psychic,skeleton",
  },
  {
    puzzle: "colossal,storm,apocalypse,storm",
    date: { seconds: 1639539776, nanoseconds: 963000000 },
    discord: "test#12345",
  },
  {
    date: { seconds: 1639602633, nanoseconds: 799000000 },
    discord: "thΞmcpuss#6969",
    puzzle: "apocalypse,beast,skeleton,storm",
  },
  {
    discord: "tommyguy#2397",
    puzzle: "colossal,apocalypse,despair,storm",
    date: { seconds: 1639604877, nanoseconds: 442000000 },
  },
  {
    puzzle: "rage,despair,psychic,despair",
    discord: "tyler.scharf#5901",
    date: { seconds: 1639602525, nanoseconds: 730000000 },
  },
  {
    discord: "walnut#9552",
    date: { seconds: 1639602513, nanoseconds: 911000000 },
    puzzle: "despair,beast,beast,rage",
  },
  {
    date: { seconds: 1639604759, nanoseconds: 858000000 },
    puzzle: "luminescence,beast,despair,skeleton",
    discord: "windd#2112",
  },
  {
    puzzle: "despair,psychic,apocalypse,colossal",
    discord: "woofywolf#7388",
    date: { seconds: 1639602443, nanoseconds: 605000000 },
  },
  {
    puzzle: "colossal,apocalypse,colossal,skeleton",
    discord: "zzz#8394",
    date: { seconds: 1639602573, nanoseconds: 73000000 },
  },
]; 

function App() {
  // Auto sign-in, retrieve config
  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.log(error);
    });
  }, []);

  const onClick = () => {
    console.log(123);

    completePuzzle();
  };

  const completePuzzle = async () => {
    // Update firestore
    const db = getFirestore(app);

    // get all puzzle discord
    onSnapshot(collection(db, "puzzle1"), (snap) => {
      let records = [];
      snap.forEach((doc) => {
        const data = doc.data();
        console.log(data);

        records = [...records, data];
      });

      console.log(JSON.stringify(records));
      console.log(records.length)
    });

    return;

    const trungs = [
       {
    trung_discord: "_daniel#1368",
    date: { seconds: 1639602602, nanoseconds: 326000000 },
    discord: "EyesForward",
    puzzle: "rage,storm,luminescence,apocalypse",
  },
      // {
      //   trung_discord: "Yogurt#3965",
      //   discord: "lemonsq#6762",
      //   puzzle: "luminescence,skeleton,storm,storm",
      //   date: { seconds: 1639604673, nanoseconds: 6000000 },
      // },

      // {
      //   trung_discord: "Aston Drip#7671",
      //   puzzle: "apocalypse,skeleton,colossal,skeleton",
      //   date: { seconds: 1639604852, nanoseconds: 678000000 },
      //   discord: "nfthunter#0159",
      // },
      // {
      //   trung_discord: "Benedict Cucumber#1807",
      //   date: { seconds: 1639604674, nanoseconds: 705000000 },
      //   puzzle: "rage,psychic,rage,despair",
      //   discord: "nftplay#0037",
      // },
      // {
      //   trung_discord: "bronskylawerence#2161",
      //   puzzle: "colossal,storm,apocalypse,storm",
      //   date: { seconds: 1639539776, nanoseconds: 963000000 },
      //   discord: "test#12345",
      // },
      // {
      //   trung_discord: "FRESH#6506",
      //   puzzle: "rage,despair,psychic,despair",
      //   discord: "tyler.scharf#5901",
      //   date: { seconds: 1639602525, nanoseconds: 730000000 },
      // },
    ];

    trungs.forEach(async trung => {
      // const trung = {
      //   trung_discord: "CopInTheHood#0763",
      //   discord: "killua_kun#7249",
      //   puzzle: "skeleton,skeleton,skeleton,luminescence",
      //   date: { seconds: 1639604649, nanoseconds: 913000000 },
      // };
  
      await deleteDoc(doc(db, `puzzle1/${trung.discord}`));
  
      // add winner
      const docRef = doc(db, `puzzle1/${trung.trung_discord}`);
      setDoc(docRef, {
        date: new Date(trung.date.seconds * 1000),
        discord: `${trung.trung_discord}`,
        puzzle: trung.puzzle,
      });
  
      await updateDoc(doc(db, `puzzle1/${trung.trung_discord}`), {
        date: trung.date,
      });
    })

    
  };

  return (
    <div>
      <h2>Hello world!</h2>
      <Button variant="contained" color="primary" onClick={onClick}>
        Default
      </Button>
    </div>
  );
}

export default App;
