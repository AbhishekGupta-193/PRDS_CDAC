import React, { useState } from 'react';
import styles from './MoreInfo.module.css';
import Tab from '../Content';
// import ToTheTopBtn from '../ToTheTop';

const Index = ({ data, council }) => {

    const [tab, setTab] = useState(1);

    const handleClick = (num) => {
        setTab(num);
    }

    const listify = (list) => list.map(item => {
        return <span className={styles['content']}>{item}</span>
    })

    return (
        <div className={styles['nccnits-container']}>
            {/* <ToTheTopBtn /> */}
            

            <div className={styles['selection-bar']}>
                {tab === 1 ?
                    <span className={styles['active-tab']} onClick={() => handleClick(1)}>About</span>
                    : <span className={styles['tab']} onClick={() => handleClick(1)}>About</span>}
                {tab === 2 ?
                    <span className={styles['active-tab']} onClick={() => handleClick(2)}>Objective</span> :
                    <span className={styles['tab']} onClick={() => handleClick(2)}>Objective </span>
                }
                {tab === 3 ?
                    <span className={styles['active-tab']} onClick={() => handleClick(3)}>Key Elements</span> :
                    <span className={styles['tab']} onClick={() => handleClick(3)}>Key Elements</span>}
            </div>

            <Tab type={tab} data={data} />
        </div>
    )
}

export default Index
