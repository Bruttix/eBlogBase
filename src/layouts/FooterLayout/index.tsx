import React from "react";

const FooterLayout = ({ children }: React.PropsWithChildren) => {
  return (
      <>
        <div className="footerContainer"> 
        <footer className="footer">
          <div className="footer__logo-box">
            <picture className="footer__logo">
              <img src="https://res.cloudinary.com/dqbkfteqj/image/upload/v1679865195/BGoldLogoAbstract_clear_cehnai.png" alt="Suga" />
            </picture>
          </div>
          <div className="footerRow">
            <div className="footerCol col-1-of-2">
              <div className="footer__navigation">
                <ul className="footer__list">
                  <li className="footer__item">
                    <a href="https://brandongreene.net" className="footer__link">Contact </a>
                  </li>
                  <li className="footer__item">
                    <a href="https://www.linkedin.com/in/brandondavidgreene/" className="footer__link">Social</a>
                  </li>
                  <li className="footer__item">
                    <a href="#" className="footer__link">Guides (soon)</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footerCol col-1-of-2">
              <p className="footer__copyright">
                Built by
                <a href="https://brandongreene.net" className="footer__link"
                  >Brandon Greene</a
                >
                for anyone to view and post responsibly. This software as a service application
                intention was to help all individuals in having an online blog to share, like, or comment on news.
                <br /><br />Advanced Typescript, HTML, CSS. Copyright &copy; by <a href="https://brandongreene.net" className="footer__link"
                  > Brandon Greene</a
                >. If interested in
                collaboration please visit my
                <a href="https://brandongreene.net" className="footer__link"
                  >platform.</a
                >
              </p>
            </div>
          </div>
        </footer>
       </div>
      </>
  );
};

export default FooterLayout;
