import Image from "next/image";
import logoWithText from '../../../../../../assets/swg/logo_with_text.svg';

const TopContent = () => {
  return (
    <div>
      <Image
        src={logoWithText}
        alt="ralan"
      />
    </div>
  )
} 

export default TopContent;
