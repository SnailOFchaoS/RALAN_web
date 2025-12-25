import Image from "next/image";
import { useIsMobile } from "@/components/Common/hooks/useIsMobile";

import gearsImage from "../../../../assets/svg/gears.svg";
import styles from "./WebsiteInfoPage.module.scss";

const SiteInfoPage = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={isMobile ? styles.titleMobile : styles.title}>
        {isMobile ? (
          <>
            Простите,
            <br />
            мобильная версия
            <br />
            еще в разработке
          </>
        ) : (
          <>
            Простите,
            <br />
            сайт еще в разработке
          </>
        )}
      </h1>
      <div className={isMobile ? styles.imageWrapperMobile : styles.imageWrapper}>
        <Image
          src={gearsImage}
          alt="В разработке"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};

export default SiteInfoPage;
