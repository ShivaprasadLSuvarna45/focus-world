import React from "react";
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';
import rtl from 'jss-rtl';
import { create } from 'jss';

// import {

//     jssPreset,
//   } from '@material-ui/core/styles';

// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = (props: any) => {
  return <StyleSheetManager >{props.children}</StyleSheetManager>;
};

export default RTL;