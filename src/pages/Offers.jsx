import React from 'react'
import OfferCard from '../components/OffersCard'
import assets from '../assets/assests'
import OfferModal from '../components/OfferModal'

const Offers = () => {
  return (
    <div>
      <OfferCard image={assets.flyer} title={"Ongoing offer"} status={"Ongoing"} description={"This is a sample offer description."} price={99.99} date={"September 11, 2025"} clicks={140} sales={20}/>
      {/* <OfferModal isOpen={true} onClose={false}/> */}
    </div>
    
  )
}

export default Offers


// Example usage:
// <OfferCard 
//   imageSrc="https://example.com/image.jpg"
//   title="Professional Service"
//   status="Active"
//   description="This is a sample offer description."
//   price={99.99}
//   date="September 11, 2025"
//   clicks={150}
//   sales={20}
// />