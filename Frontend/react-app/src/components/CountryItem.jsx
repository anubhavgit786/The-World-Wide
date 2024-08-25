import React from 'react';
import Flag from './Flag';

import styles from "./CountryItem.module.css";



const CountryItem = ({ country }) => 
{
  return (
    <li className={styles.countryItem}>
      <span><Flag countryEmoji={country.emoji}/></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;