const TopMenu = ({items}) => {
  if (!items) return null;

  return(
    <div className="top-menu">
      <div className="wrapper">
        <ul className="top-menu__items">
          {items.map((item) => {
            return(
              <li key={item.title} className="top-menu__item">
                <Link to={item.url}>{item.title}</Link>
              </li>
            ); 
          })}
        </ul>
      </div>
    </div>
  );
}

const HeaderMainPhone = ({ phone, workingHours }) => {
  // +7-495-790-35-03">+7 495 79 03 5 03
  let formatedPhone = phone;
  return(
    <div className="header-main__phone">
      <a href={`tel:${formatedPhone}`}>{phone}</a>
      {workingHours ? (<p>{workingHours}</p>) : null}
    </div>
  );
}

const HeaderMainLogo = props => {
  return(
    <div className="header-main__logo">
      <Link to="/">
        <h1>
          <img src="/img/header-logo.png" alt="logotype" />
        </h1>
      </Link>
      <p>Обувь и аксессуары для всей семьи</p>
    </div>
  );
}

class HeaderMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchActive: false,
      isProfilePanelVisible: false, 
      isBasketPanelVisible: false
    }
    this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
    this.handleBasketIconClick = this.handleBasketIconClick.bind(this);
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  handleProfileIconClick(event) {
    event.preventDefault();
    this.setState({
      isProfilePanelVisible: !this.state.isProfilePanelVisible, 
      isBasketPanelVisible: false
    })     
  } 

  handleBasketIconClick(event) {
    event.preventDefault();
    this.setState({
      isProfilePanelVisible: false, 
      isBasketPanelVisible: !this.state.isBasketPanelVisible
    })     
  }

  handleSearchIconClick(event) {
    event.preventDefault();
    this.setState({
      isSearchActive: !this.state.isSearchActive
    });
  } 

  render() {
    const { isSearchActive, isProfilePanelVisible, isBasketPanelVisible } = this.state;
    const isPanelVisible = (isProfilePanelVisible || isBasketPanelVisible) ? true : false;
    return (
      <div className="header-main">
        <div className="header-main__wrapper wrapper">
          {this.props.children}
          <HeaderMainProfile 
            isSearchActive={isSearchActive}
            isProfileMenuActive={isProfilePanelVisible} 
            isBasketMenuActive={isBasketPanelVisible}
            onSearchClick={this.handleSearchIconClick}
            onProfileClick={this.handleProfileIconClick} 
            onBasketClick={this.handleBasketIconClick} />
        </div>
        <HeaderMainHiddenPanel isVisible={isPanelVisible}>
          <ProfilePanel isVisible={isProfilePanelVisible} />
          <BasketPanel isVisible={isBasketPanelVisible} />
        </HeaderMainHiddenPanel>
      </div>
    );
  }
}

const HeaderMainHiddenPanel = (props) => {
  const { isVisible } = props;
  return (
    <div className={`header-main__hidden-panel hidden-panel ${isVisible ? 'header-main__hidden-panel_visible' : null}`}>
      <div className="wrapper">
        {props.children}
      </div>
    </div>
  );
}

const BasketPanel = ({ isVisible }) => {
  return(
    <div className={`hidden-panel__basket basket-dropped ${isVisible ? 'hidden-panel__basket_visible' : null}`}>
      <div className="basket-dropped__title">В вашей корзине:</div>
      <div className="basket-dropped__product-list product-list">
        <div className="product-list__item">
          <a className="product-list__pic">
            <img src="/img/product-list__pic_1.jpg" alt="product" /> </a>
          <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
          <div className="product-list__fill"></div>
          <div className="product-list__price">12 360
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <div className="product-list__delete">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>

        <div className="product-list__item">
          <a className="product-list__pic">
            <img src="/img/product-list__pic_1.jpg" alt="product" /> </a>
          <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
          <div className="product-list__fill"></div>
          <div className="product-list__price">12 360
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <div className="product-list__delete">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <div className="product-list__item">
          <a className="product-list__pic">
            <img src="/img/product-list__pic_1.jpg" alt="product" /> </a>
          <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
          <div className="product-list__fill"></div>
          <div className="product-list__price">12 360
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <div className="product-list__delete">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <div className="product-list__item">
          <a className="product-list__pic">
            <img src="/img/product-list__pic_1.jpg" alt="product" /> </a>
          <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
          <div className="product-list__fill"></div>
          <div className="product-list__price">12 360
            <i className="fa fa-rub" aria-hidden="true"></i>
          </div>
          <div className="product-list__delete">
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>

      </div>
      <a className="basket-dropped__order-button" href="order.html">Оформить заказ</a>
    </div>
  );
}

const ProfilePanel = ({ isVisible }) => {
  return(
    <div className={`hidden-panel__profile ${isVisible ? 'hidden-panel__profile_visible' : null}`}>
      <a href="#">Личный кабинет</a>
      <a href="/favorite/">
        <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</a>
      <a href="#">Выйти</a>
    </div>
  );
}

const HeaderMainProfile = props => {
  const { isSearchActive, isProfileMenuActive, isBasketMenuActive, onSearchClick, onProfileClick, onBasketClick } = props;
  return(
    <div className="header-main__profile">
      <div className="header-main__pics">
        <HeaderMainProfileSearchIcon isActive={isSearchActive} onClick={onSearchClick} />
        <HeaderMainProfileBorder />
        <HeaderMainProfileProfileIcon isActive={isProfileMenuActive} onClick={onProfileClick} />
        <HeaderMainProfileBorder />
        <HeaderMainProfileBasketIcon isActive={isBasketMenuActive} onClick={onBasketClick} />
      </div>
      <HeaderMainProfileSearchForm isActive={isSearchActive} />
    </div>
  );
}

const HeaderMainProfileSearchForm = ({ isActive }) => {
  return (
    <form className={`header-main__search ${isActive ? 'header-main__search_active' : null}`} action="#">
      <input placeholder="Поиск" />
      <i className="fa fa-search" aria-hidden="true"></i>
    </form>
  );
}


const HeaderMainProfileBasketIcon = ({ isActive, onClick }) => {
  return(
    <div className="header-main__pic header-main__pic_basket" onClick={onClick}>
      <div className="header-main__pic_basket_full">1</div>
      <div className={`header-main__pic_basket_menu  ${isActive ? 'header-main__pic_basket_menu_is-active' : null}`}></div>
    </div>
  );
}

const HeaderMainProfileProfileIcon = ({ isActive, onClick }) => {
  return(
    <div className="header-main__pic header-main__pic_profile" onClick={onClick}>
      <div className={`header-main__pic_profile_menu  ${isActive ? 'header-main__pic_profile_menu_is-active' : null}`}></div>
    </div>
  );
}

const HeaderMainProfileSearchIcon = ({ isActive, onClick }) => {
  return(
    <div 
      className={`header-main__pic header-main__pic_search ${isActive ? 'header-main__pic_search_is-hidden' : null}`}
      onClick={onClick}
    ></div>
  );
}

const HeaderMainProfileBorder = () => <div className="header-main__pic_border"></div>

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenuItems: this.props.topMenuItems,
      phone: this.props.phone,
      workingHours: this.props.workingHours
    }
  }

  render() {
    const { topMenuItems, phone, workingHours } = this.state;
    
    return(
      <header className="header">
        <TopMenu items={topMenuItems} />
        <HeaderMain>
          <HeaderMainPhone phone={phone} workingHours={workingHours}/>
          <HeaderMainLogo />
        </HeaderMain>
        <nav className="main-menu">
          <div className="wrapper">
            <ul className="main-menu__items">
              <li className="main-menu__item main-menu__item_sales">
                <a href="#">Акции</a>
              </li>
              <li className="main-menu__item main-menu__item_women">
                <a href="#">Женская обувь</a>
              </li>
              <li className="main-menu__item main-menu__item_men">
                <a href="#">Мужская обувь</a>
              </li>
              <li className="main-menu__item main-menu__item_kids">
                <a href="#">Детская обувь</a>
              </li>
              <li className="main-menu__item main-menu__item_accessories">
                <a href="#">Аксессуары</a>
              </li>
              <li className="main-menu__item main-menu__item_home">
                <a href="#">Для дома</a>
              </li>
              <li className="main-menu__item main-menu__item_brands">
                <a href="#">Бренды</a>
              </li>
              <li className="main-menu__item main-menu__item_new">
                <a href="#">Новинки</a>
              </li>
            </ul>
          </div>

        </nav>
        <div className="dropped-menu">
          <div className="wrapper">
            <div className="dropped-menu__lists dropped-menu__lists_women">
              <h3 className="dropped-menu__list-title">Повод:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Офис</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Вечеринка</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Свадьба</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Спорт</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Море</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Дом</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Повседневное</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
              <h3 className="dropped-menu__list-title">Категории:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Балетки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Босоножки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботильоны</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботинки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботфорты</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Галоши</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Кеды и кроссовки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Мокасины</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Полусапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Резиновые сапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сабо</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сникерсы</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Тапочки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Туфли</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Шлёпанцы и вьетнамки</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Сезон:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Зима</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Весна</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Лето</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Осень</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Бренды:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Albano</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ballin</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Baldinini</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Damlax</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Pegia</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Renzi</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Все</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </header>
    );
  }
}