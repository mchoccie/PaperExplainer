import ReactRoundedImage from "react-rounded-image"
import MyPhoto from "../images/Manan.JPG"
function roundedImage() {
    return (
        
  
          <ReactRoundedImage
            image={MyPhoto}
            roundedSize="0"
            imageWidth="110"
            imageHeight="110"
          />
      )
  }

export default roundedImage