import React from 'react';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

import Flag from './Flag';

import styles from "./CityItem.module.css";

const formatDate = (date) =>
{
    return new Intl.DateTimeFormat("en", 
    {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
}


const CityItem = ({ city }) => 
{
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;
  
  const handleClick = (e) =>
  {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : "" }`}> 
        <span className={styles.emoji}><Flag countryEmoji={emoji} /> </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>)
}

export default CityItem;

