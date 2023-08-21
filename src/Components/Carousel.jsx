import React, { useEffect } from 'react'
import {BiSolidSkipPreviousCircle, BiSolidSkipNextCircle} from 'react-icons/bi';
import {PiQuotesFill} from 'react-icons/pi'
import { useState } from 'react';
import  list  from '../data';
import '../index.css';


const Carousel = () => {
    const [people, setPeople] = useState(list);
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = list.length

    const setNext = () => {
        const newIndex = (currentIndex + 1) % length
        setCurrentIndex(newIndex)
    }
    const setPrev = () => {
        const newIndex = (currentIndex-1+length)%length
        setCurrentIndex(newIndex)
    }

    useEffect (()=> {
      let sliderId = setInterval(()=> {
        setNext();
      },2000)
      return () => {
        clearInterval(sliderId)
      }
    },[currentIndex])

  return (
    <section className="container">
      {people.map((person, personIndex) => {
        const { id, name, title, image, quote } = person;
        return (
          <article
            key={id}
            className="article"
            style={{
              transform: `translateX(${100 * (personIndex - currentIndex)}%)`,
              visibility: personIndex === currentIndex ? 'visible' : 'hidden',
              opacity: personIndex === currentIndex ? '1' : '0',
            }}
          >
            <img src={image} alt={title} className="img" />
            <h3 className="name">{name}</h3>
            <h4>{title}</h4>
            <p>"{quote}"</p>
            <p className="quote">
              <PiQuotesFill />
            </p>
          </article>
        );
      })}
      <button type="button" className="prev" onClick = {setPrev}>
        <BiSolidSkipPreviousCircle />
      </button>
      <button type="button" className="next" onClick = {setNext}>
        <BiSolidSkipNextCircle />
      </button>

    </section>
  );
}

export default Carousel
