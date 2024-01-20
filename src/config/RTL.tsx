import React from "react";
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

const RTL = (props: any) => {
  return <StyleSheetManager >{props.children}</StyleSheetManager>;
};

export default RTL;