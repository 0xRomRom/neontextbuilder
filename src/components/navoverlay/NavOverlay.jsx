import stl from "./NavOverlay.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";

const NavOverlay = ({ showNav, setShowNav }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [showDroplist, setShowDroplist] = useState(false);

  const handleCloseButtonClick = () => {
    setShowNav(!showNav); // Slide to the right
  };

  return (
    <div className={`${stl.navOverlay} ${showNav ? stl.slideIn : stl.hidden}`}>
      <div className={stl.topbar}>
        <button className={stl.closeCta} onClick={handleCloseButtonClick}>
          <img
            src="./images/Close.svg"
            alt="Close modal"
            className={stl.closeX}
          />
        </button>
      </div>
      <div className={stl.innerLinks}>
        <ul className={stl.links}>
          <li
            className={stl.navLink}
            onMouseOver={() => setHoveredState("Home")}
            onMouseLeave={() => setHoveredState(null)}
          >
            <FaArrowRight className={stl.arrowright} />
            <a
              className={`${stl.anchor} ${
                hoveredState === "Home" ? stl.active : ""
              }`}
              href="https://ledsgoneon.nl/"
              rel="noreferrer"
              onClick={() => (window.location.href = "https://ledsgoneon.nl")}
            >
              Home
            </a>
          </li>

          <li
            className={stl.navLink}
            onMouseOver={() => setHoveredState("Tekst Samenstellen")}
            onMouseLeave={() => setHoveredState(null)}
          >
            <FaArrowRight className={stl.arrowright} />
            <a
              className={`${stl.anchor} ${
                hoveredState === "Tekst Samenstellen" ? stl.active : ""
              }`}
              href="https://ledsgoneon.nl/tekst-samenstellen/"
              rel="noreferrer"
              onClick={() =>
                (window.location.href =
                  "https://ledsgoneon.nl/tekst-samenstellen/")
              }
            >
              Tekst Samenstellen
            </a>
          </li>

          <li className={stl.navLink}>
            <FaArrowRight
              className={`${stl.arrowright} ${stl.showArrow} ${stl.noevents}`}
            />
            <a
              href="https://ledsgoneon.nl/logosamensteller/"
              className={`${stl.anchor} ${stl.active}`}
            >
              Logo Samenstellen
            </a>
          </li>

          <li
            className={stl.navLink}
            onMouseOver={() => setHoveredState("Projecten")}
            onMouseLeave={() => setHoveredState(null)}
          >
            <FaArrowRight className={stl.arrowright} />
            <a
              className={`${stl.anchor} ${
                hoveredState === "Projecten" ? stl.active : ""
              }`}
              href="https://ledsgoneon.nl/projecten/"
              rel="noreferrer"
              onClick={() =>
                (window.location.href = "https://ledsgoneon.nl/projecten/")
              }
            >
              Projecten
            </a>
          </li>

          <li
            className={stl.navLink}
            onMouseOver={() => setHoveredState("Inspiratie")}
            onMouseLeave={() => setHoveredState(null)}
          >
            <FaArrowRight className={stl.arrowright} />
            <a
              className={`${stl.anchor} ${
                hoveredState === "Inspiratie" ? stl.active : ""
              }`}
              href="https://ledsgoneon.nl/inspiratie/"
              rel="noreferrer"
              onClick={() =>
                (window.location.href = "https://ledsgoneon.nl/inspiratie/")
              }
            >
              Inspiratie
            </a>
          </li>

          <li
            className={`${stl.navLink} ${stl.overons} ${
              showDroplist ? stl.rotate : ""
            }`}
            onMouseOver={() => setHoveredState("Over ons")}
            onMouseLeave={() => setHoveredState(null)}
          >
            <FaArrowRight className={stl.arrowright} />
            <span
              className={`${stl.anchor} ${
                hoveredState === "Over ons" ? stl.active : ""
              }`}
              onClick={() => setShowDroplist(!showDroplist)}
            >
              Over ons
              <div
                className={`${stl.droplist} ${
                  showDroplist ? stl.showDrop : ""
                }`}
              >
                <span
                  className={stl.innerDropItem}
                  onClick={() =>
                    window.open("https://ledsgoneon.nl/over-ons/", "_self")
                  }
                >
                  Over ons
                </span>
                <span
                  className={stl.innerDropItem}
                  onClick={() =>
                    window.open(
                      "https://ledsgoneon.nl/productieproces/",
                      "_self"
                    )
                  }
                >
                  Productieproces
                </span>
              </div>
            </span>
          </li>

          <li
            className={stl.navLink}
            onMouseOver={() => setHoveredState("Contact")}
            onMouseLeave={() => setHoveredState(null)}
          >
            <FaArrowRight className={stl.arrowright} />
            <a
              className={`${stl.anchor} ${
                hoveredState === "Contact" ? stl.active : ""
              }`}
              href="https://ledsgoneon.nl/contact/"
              rel="noreferrer"
              onClick={() =>
                (window.location.href = "https://ledsgoneon.nl/contact/")
              }
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className={stl.bottomBox}>
        <a
          className={stl.phoneanchor}
          href="tel:0521700234"
          onClick={() => window.open("tel:0521700234", "_blank")}
        >
          {" "}
          0521 700234
        </a>

        <a
          className={stl.emailanchor}
          href="mailto:info@ledsgoneon.nl"
          onClick={() => window.open("mailto:info@ledsgoneon.nl", "_blank")}
        >
          info@ledsgoneon.nl
        </a>
        <div className={stl.socialicons}>
          <a
            href="https://www.facebook.com/LedsGoNeonNL"
            onClick={() =>
              window.open("https://www.facebook.com/LedsGoNeonNL", "_blank")
            }
          >
            <BiLogoFacebookCircle className={stl.inIcon} />
          </a>
          <a
            href="https://www.linkedin.com/company/leds-go/"
            onClick={() =>
              window.open("https://www.linkedin.com/company/leds-go/", "_blank")
            }
          >
            <FaLinkedinIn className={stl.inIcon} />
          </a>
          <a
            href="https://www.instagram.com/leds.go.neon/"
            onClick={() =>
              window.open("https://www.instagram.com/leds.go.neon/", "_blank")
            }
          >
            <FaInstagram className={stl.inIcon} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCOWfn-_6exD3VlEmNnRDzvA"
            onClick={() =>
              window.open(
                "https://www.youtube.com/channel/UCOWfn-_6exD3VlEmNnRDzvA",
                "_blank"
              )
            }
          >
            <GrYoutube className={stl.inIcon} />
          </a>
        </div>
      </div>
      <div className={stl.backdrop}></div>
    </div>
  );
};

export default NavOverlay;
