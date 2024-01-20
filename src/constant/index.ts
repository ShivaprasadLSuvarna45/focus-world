const users = {
    locations: [
      {
        name: "en",
        theme: {
          palette: {
            primary: {
              main: "#F1D6D0",
            },
          },
        },
      },
      {
        name: "de",
        theme: {
          palette: {
            primary: {
              main: "#C3C3C3",
            },
          },
        },
      },
      {
        name: "ar",
        theme: {
          palette: {
            primary: {
              main: "#E3DEC6",
            },
          },
        },
      },
      {
        name: "hi",
        theme: {
          palette: {
            primary: {
              main: "#F5F5DC",
            },
          },
        },
      },
    ],
  };
  

 export  enum Language{
    en='en',
    de='de',
    ar='ar',
    hi='hi',
  }



  const languages :Record<Language,{language:string}>= {
    en: { language: "English" },
    de: { language: "Deutsch" },
    ar: { language: "Arabic" },
    hi: { language: "India" },
  };

  const language=[
     {key:'en', language: "English" },
     {key:'de', language: "Deutsch" },
     {key:'ar', language: "Arabic" },
     {key:'hi', language: "India" },
  ]
  
  export { users, languages,language };