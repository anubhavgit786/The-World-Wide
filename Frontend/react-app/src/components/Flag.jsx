import React from 'react';
import ReactCountryFlag from "react-country-flag"

function flagEmojiToCountryCode(flag) {
    // Split the emoji into two characters
    const codePoints = Array.from(flag).map(char => char.codePointAt(0));
    
    // Convert the code points to ASCII letters
    const countryCode = codePoints.map(cp => String.fromCharCode(cp - 0x1F1E6 + 65)).join('');
    
    return countryCode;
  }
  
  

const Flag = ({ countryEmoji }) => 
{

    const countryCode = flagEmojiToCountryCode(`${countryEmoji}`);
  return (
    <ReactCountryFlag countryCode={countryCode} svg />
  );
}

export default Flag;
