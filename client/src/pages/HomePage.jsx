import React from 'react'
import{NavLink}from 'react-router-dom'
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.homepage}>
      <div className={styles.contentcontainer}>
        <NavLink to={'login'} > <span className={styles.homepagecontent}>Login</span></NavLink>
        <NavLink to={'register'}> <span className={styles.homepagecontent}>SignUP</span></NavLink>

      </div>
      {/* <h1>home page</h1> */}
        <img className='homepageimg' src="/images/Service 24_7.svg" alt=" logo" />
    </div>
  )
}

export default HomePage