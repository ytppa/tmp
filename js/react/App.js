







const Footer = () => {
  return (
    <footer className="footer">
      <section className="subscribe">
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
          <form className="subscribe__radios" action="">
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="women" onChange={()=>console.log('footer onChange')}/>
              <div className="subscribe__radio_text">Женское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="men" onChange={()=>console.log('footer onChange')}/>
              <div className="subscribe__radio_text">Мужское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="both" checked="" onChange={()=>console.log('footer onChange')}/>
              <div className="subscribe__radio_text">Всё</div>
            </label>
            <input className="subscribe__email" type="email" placeholder="Ваш e-mail" />
            <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" />
          </form>
        </div>
      </section>
      <div className="footer__bottom">
        <div className="wrapper">
          <div className="footer__menus">
            <div className="footer__menu footer__menu_about">О магазине
              <ul>
                <li><a href="#">BosaNoga</a></li>
                <li><a href="#">Новости</a></li>
                <li><a href="#">Пресса</a></li>
              </ul>
            </div>
            <div className="footer__menu footer__menu_collection">Коллекции
              <ul>
                <li><a href="#">Обувь</a></li>
                <li><a href="#">Аксессуары</a></li>
                <li><a href="#">Для дома</a></li>
              </ul>
            </div>
            <div className="footer__menu footer__menu_help">Помощь
              <ul>
                <li><a href="#">Как купить?</a></li>
                <li><a href="#">Возврат</a></li>
                <li><a href="#">Контакты</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__info">
            <h3 className="footer__info_title">Принимаем к оплате:</h3>
            <div className="footer__paid-systems">
              <div className="footer__paid footer__paid_paypal"></div>
              <div className="footer__paid footer__paid_master-card"></div>
              <div className="footer__paid footer__paid_visa"></div>
              <div className="footer__paid footer__paid_yandex"></div>
              <div className="footer__paid footer__paid_webmoney"></div>
              <div className="footer__paid footer__paid_qiwi"></div>
            </div>
            <div className="footer__social-links">
              <h3 className="footer__social-links_title">Мы в соц.сетях:</h3>
              <div className="footer__social-link footer__social-link_twitter"></div>
              <div className="footer__social-link footer__social-link_vk"></div>
            </div>
            <div className="footer__copyright">2009-2018 © BosaNoga.ru — модный интернет-магазин обуви<br /> и аксессуаров. Все права защищены. Доставка по всей России!</div>
          </div>
          <div className="footer__contacts"><a className="footer__phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <p className="footer__phone_text">Ежедневно: с 09-00 до 21-00</p><a className="footer__email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Article = ({ name, children }) => {
  return(
    <section className={name}>
      {children}
      <span className="about-us__text_overlay"></span>
      <button className="about-us__text_button">читать</button>
    </section>
  );
}

class Content extends React.Component {
  componentDidMount() {
    // preloader_wrapper hide
    document.querySelector('.preloader_wrapper').classList.add('hidden');
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header {...headerParams} />
          <Switch>
            <Route path="/product-card-desktop/:id" component={ProductCardDesktopPage} />
            <Route path="/catalogue/" component={CataloguePage} />
            <Route path="*" component={HomePage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

// export default withCookies(Content);
// <CookiesProvider>

class App extends React.Component {
  render() {
    return (
      <Content />
    );
  }
}




var headerParams = {
  topMenuItems: [
    { url: '#', title: 'Возврат' },
    { url: '#', title: 'Доставка и оплата' },
    { url: '#', title: 'О магазине' },
    { url: '#', title: 'Контакты' },
    { url: '#', title: 'Новости' }
  ],
  phone: '+7 495 79 03 5 03',
  workingHours: 'Ежедневно: с 09-00 до 21-00'
}





ReactDOM.render(<App />, document.getElementById("root"));