import React from 'react';
import { Link } from 'react-router-dom'; // Use React Router for navigation
import PropTypes from 'prop-types';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className='infoBar'>
    <div className='leftInnerContainer'>
      <img className='onlineIcon' src={onlineIcon} alt='online icon' />
      <h3>{room || 'Chat Room'}</h3> {/* Default text if room is empty */}
    </div>
    <div className='rightInnerContainer'>
      <Link to='/' aria-label='Close chat'>
        <img src={closeIcon} alt='close icon' />
      </Link>
    </div>
  </div>
);

InfoBar.propTypes = {
  room: PropTypes.string.isRequired,
};

export default InfoBar;
