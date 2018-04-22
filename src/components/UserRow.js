import React from 'react'
import pay from '../assets/pagar.svg'
import arrow from '../assets/down.svg'
import './style/User.css'

export const UserRow = ({img, name, id, username}) => (
  <div className="User-card">
      <div className="User-wrap">
        <img src={img} className="User-image" alt="usuario" />
        <div className="User-info-wrap">
          <p className="User-name">{name}</p>
          <section className="User-detail-wrap">
            <h3 className="User-detail">{id}</h3>
            <p className="User-detail-spaced">{username}</p>
          </section>
        </div>
      </div>
      <div className="User-right-accessory">
        <img src={pay} className="User-accessory-image" alt="pagar" />
        <h4 className="User-accessory-title">PAGAR</h4>
        <img src={arrow} className="User-accessory-image" alt="seta" />
      </div>
    </div>
)
