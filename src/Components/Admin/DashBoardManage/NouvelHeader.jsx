import React from 'react'
import useStyles from '../../Style'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const NouvelHeader = ( { newsList } ) => {
    const classes = useStyles();

    const responsive = {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1024: {
        items: 4
      }
    };
  return (
    <div  style={{display: 'flex',position: 'relative',alignItems: 'center',justifyContent: 'center',width:'100%',height:'220px'}}>
      <div style={{width:'100%',position:'absolute'}}>
        <AliceCarousel mouseTracking items={newsList}
          duration={400}
          autoPlay={true}
          startIndex = {1}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          playButtonEnabled={true}
          responsive={responsive}
          autoPlayInterval={3000}
          autoPlayDirection="rtl"
          autoPlayActionDisabled={true}  
          disableButtonsControls={true} 
          disableDotsControls={true}
          infinite
        />
        
      </div>
    </div>
    // <div>
    //     <div className={classes.nouvelHeader} >
    //         <h2 style={{color:'#9E9E9E',fontSize:'24px'}}>{nouvel}</h2>
    //         <p style={{color:'rgba(0, 0, 0, 0.24)',marginTop:'-10px',fontSize:'12px'}}>{description}</p>
    //     </div>
    // </div>
  )
}

export default NouvelHeader
