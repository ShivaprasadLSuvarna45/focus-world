import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Trans, useTranslation } from 'react-i18next';
import i18n from "i18next";


function App() {

  const handleClick = (lan: any) => {
    let x = t('name');
    console.log('shiv ', x, lan);
    i18n.changeLanguage(lan);

  };

  const [amount, setAmount] = useState<any>("");
  const { t } = useTranslation();

  return (
    <div className="App">
      <div>{t('name')}</div>
      <Stack direction="row" spacing={1}>
        <Chip label="English" onClick={()=>handleClick('en')} />
        <Chip label="Arabic" variant="outlined" onClick={()=>handleClick('ar')} />
        <Chip label="Hindi" variant="outlined" onClick={()=>handleClick('hi')} />

      </Stack>
    </div>
  );
}

export default App;
