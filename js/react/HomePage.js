class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      slides: this.props.slides
    }
  }

  componentDidMount() {
    var f = document.querySelector('.slider__pictures'),
        a = f.getElementsByClassName('slider__image'),
        button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
        arrows = f.getElementsByClassName('slider__arrow');
    slider(f, a, button, '4000', '1000', arrows);
  }

  render() { 
    const { title, slides } = this.state;
    return(
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures">
            {slides.map(slide => <SliderItem {...slide} />)}
            <div className="arrow slider__arrow slider__arrow_left"></div>
            <div className="arrow slider__arrow slider__arrow_right"></div>
            <div className="slider__circles">
              {slides.map( (slide, i) => <button className="slider__circle" value={i}></button>)}
            </div>
            <h2 className="h2">{title}</h2>
          </div>
        </div>
      </section>
    );
  }
}

Slider.propTypes = {
  title: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.object)
}

const SliderItem = props => {
  let { href, src, alt } = props;
  return (
    <Link to={href} className="slider__image">
      <img src={src} alt={alt} />
    </Link>
  );
}

SliderItem.propTypes = {
  href: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

SliderItem.defaultProps = {
  href: '#',
  alt: 'slide picture'
} 
 


class NewDeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      activeCategory: null
    }
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.filterCategories = this.filterCategories.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { categories, products } = newProps;
    let newState = {};

    if (products) {
      newState.products = products;
    }

    if (categories) {
      newState.categories = categories;
      if (this.state.activeCategory === null)
        newState.activeCategory = newState.categories[0].id;
    }
    this.setState( newState );
  }

  filterCategories() {
    let { categories, products, activeCategory } = this.state;

    if (categories.length && products.length) {
      // Скрываем категории, которые не представлеы в реестре продуктов
      categories = categories.filter(categorie => !!products.some(product => product.categoryId == categorie.id));  

      // Сбросим выделение на первый видимый элемент
      if (!categories.some(category => category.id == activeCategory)) 
        activeCategory = categories[0].id;
    }

    return { categories, activeCategory };
  }

  handleMenuSelect(event, i) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    this.setState({ activeCategory: id });
  }

  render() {
    const { title } = this.props,
          { categories, activeCategory } = this.filterCategories(), 
          { products } = this.state,
          filteredProducts = products.filter(product => product.categoryId == activeCategory);
    return(
      <section className="new-deals wave-bottom">
        <h2 className="h2">{title}</h2>
        <NewDealsMenu categories={categories} active={activeCategory} onSelect={this.handleMenuSelect} />
        <NewDealsSlider products={filteredProducts} />
      </section>
    );
  };
}


const NewDealsWithCategories = withData('/featured', data => ({ products: data }), false) 
  ( 
    withData('/categories', data => ({ categories: data }), false)
      (NewDeals) 
  );



class NewDealsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: Storage.updateFavoriteProducts(this.props.products),
      active: 0
    }
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleFavoriteSwitch = this.handleFavoriteSwitch.bind(this);
  }

  handleFavoriteSwitch(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    const favoriteArr = Storage.switchFavorite(id);
  
    const newProducts = Storage.updateFavoriteProducts(this.state.products);
    
    this.setState({
      products: newProducts
    })
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({ 
      products: Storage.updateFavoriteProducts(newProps.products),
      active: 0
    });
  }

  prepareData() {
    const { products, active } = this.state,
          productFirst = products[active-1] ? products[active-1] : products[products.length - 1], 
          productActive = products[active] ? products[active] : null, 
          productLast = products[active+1] ? products[active+1] : products[0];
    return { productFirst, productActive, productLast };
  }

  handleLeftArrowClick(event) {
    event.preventDefault();
    let newActive = this.state.active > 0 
                  ? this.state.active - 1
                  : this.state.products.length - 1;
    this.setState({ active: newActive });
  }

  handleRightArrowClick(event) {
    event.preventDefault();
    let newActive = this.state.active < this.state.products.length - 1 
                  ? this.state.active + 1
                  : 0;
    this.setState({ active: newActive });
  }

  formatPrice(aPrice) {
    return aPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽';
  }

  render() {
    if (this.state.products == null || !this.state.products.length) 
      return null;

    const { productFirst, productActive, productLast } = this.prepareData(),
          styles = { backgroundSize: 'contain' };

    return(
      <div>
        <div className="new-deals__slider">
          <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.handleLeftArrowClick}></div>
          <div 
            className="new-deals__product new-deals__product_first" 
            onClick={this.handleLeftArrowClick} 
            style={{ backgroundImage: 'url("' + productFirst.images[0] + '")', ...styles }}
          >
            <a href="#"></a>
          </div>

          <div 
            className="new-deals__product new-deals__product_active" 
            style={{ backgroundImage: 'url("' + productActive.images[0] + '")', ...styles }}
          >
            <Link to="/catalogue/"></Link>
            <div className={`new-deals__product_favorite ${productActive.favorite ? 'new-deals__product_favorite_chosen' : null}`} data-id={productActive.id} onClick={this.handleFavoriteSwitch}></div>
          </div>
          <div 
            className="new-deals__product new-deals__product_last" 
            onClick={this.handleRightArrowClick} 
            style={{ backgroundImage: 'url("' + productLast.images[0] + '")', ...styles }}
          >
            <a href="#"></a>
          </div>
          <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.handleRightArrowClick}></div>
        </div>
        <div className="new-deals__product-info">
          <Link to={`/product-card-desktop/${productActive.id}`} className="h3">{productActive.title}</Link>
          <p>Производитель: 
            <span>{productActive.brand}</span>
          </p>
          <h3 className="h3">{this.formatPrice(productActive.price)}</h3>
        </div>
      </div>
    );
  }
}

NewDealsSlider.propTypes = {
  products: PropTypes.array
}

const NewDealsMenu = ({ categories, active, onSelect}) => {
  if (categories.length) {
    return(
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
          { categories.map( category => {
            const isActive = (category.id == active) ? true : false;
            return (
              <NewDealsMenuElement category={category} isActive={isActive} onSelect={onSelect} />
            );
          }) }
        </ul>
      </div>
    );
  }

  return null;
}

NewDealsMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func.isRequired
}

const NewDealsMenuElement = ({ category, isActive, onSelect }) => {
  return(
    <li key={category.id} className={`new-deals__menu-item ${ isActive ? 'new-deals__menu-item_active' : ''}`}>
      <Link to={`/catalogue/${category.id}`} data-id={category.id} onClick={onSelect}>{category.title}</Link>
    </li>
  );
}



class SalesAndNews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <section className="sales-and-news wave-bottom">
        <h2 className="h2">{this.props.title}</h2>
        <div className="sales-and-news__items">
          <SalesAndNewsBanner id="1" href="#">
            обувь к свадьбе
          </SalesAndNewsBanner>
          <SalesAndNewsBanner id="2" href="#">
            20% скидка<br /><span>На летнюю обувь</span>            
          </SalesAndNewsBanner>
          <SalesAndNewsBanner id="3" href="#">
            готовимся к лету!
          </SalesAndNewsBanner>
          <SalesAndNewsBanner id="4" href="#">
            Больше покупок – <br />больше скидка!
          </SalesAndNewsBanner>
          <NewsCarousel />
        </div>
      </section>
    );
  }
}

const SalesAndNewsBanner = props => {
  const { id, href, children } = props;
  return(
    <div className={`sales-and-news__item sales-and-news__item_${id}`}>
      <Link to={href}>
        <h3 className="h3">{children}</h3>
      </Link>
    </div>
  );
}

// Замечание: Блок сверстан плохо. Длинные заголовки не растягивают его, 
// а выходят ниже, за границы блока. Требуется более аккуратное решение.
class NewsCarousel extends React.Component {
  render() {
    return(
      <div className="sales-and-news__news">
        <div className="sales-and-news__arrow sales-and-news__arrow_up arrow"></div>
        
        <NewsCarouselItem href="#" datetime="2017-01-18 00:00">
          Американские резиновые сапоги Bogs идеально подходят для русской зимы!
        </NewsCarouselItem>
        <NewsCarouselItem href="#" datetime="2017-05-18 00:00">
          Магазины Bosa Noga
        </NewsCarouselItem>
        <NewsCarouselItem href="#" datetime="2017-03-10 00:00">
          Тенденция весны 2018: розовый и фуксия. 10 пар обуви для яркого образа
        </NewsCarouselItem>

        <div className="sales-and-news__arrow sales-and-news__arrow_down arrow"></div>
      </div>
    );
  }
}

const NewsCarouselItem = props => {
  const { href, datetime, children } = props,
        monthsArr = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ];
  // Тут будет проверка datetime 
  const d = new Date(datetime),
        dateString = d.getDate() + ' ' 
                   + monthsArr[d.getMonth()] + ' '
                   + d.getFullYear();

  return (
    <div className="sales-and-news__new">
      <time datetime={datetime}>{dateString}</time>
      <Link to={href}>{children}</Link>
    </div>
  );
}


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [
        { 
          href: '#1', 
          src: '/img/slider.jpg',
          alt: 'slide picture'
        }, { 
          href: '#2', 
          src: '/img/slider180deg.jpeg',
          alt: 'slide picture'
        }, { 
          href: '#3', 
          src: '/img/slider.jpg',
          alt: 'slide picture'
        }, { 
          href: '#4', 
          src: '/img/slider180deg.jpeg',
          alt: 'slide picture'
        }
      ]
    }
  }

  render() {
    const { slides } = this.state;
    return (
      <div>
        <Slider title="К весне готовы" slides={slides} />
        <NewDealsWithCategories title="Новинки" />
        <SalesAndNews title="Aкции и новости" />
        <Article name="about-us">
          <h2 className="about-us__title">Клиенты делают заказ
            <br /> в интернет-магазине BosaNoga!</h2>
          <p className="about-us__text">
            В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам хочется возвращаться снова и снова.
          </p>
          <h3 className="about-us__text_header">Мы предлагаем вам особые условия:</h3>
          <ol className="about-us__text">
            <li>Индивидуальный подход специалиста. Когда поступает новая коллекция обуви весна-лето или же коллекция обуви осень-зима
              – покупателям бывает трудно сориентироваться во всем многообразии новинок. Наш менеджер по телефону поможет вам
              определиться с товарами, подходящими именно вам.</li>
            <li>Мы периодически проводим распродажи как женских и мужских, так и детских моделей. Вы будете приятно удивлены ценами
              на аксессуары в мага- зине BosaNoga.</li>
            <li>У нас всегда есть из чего выбрать. Неважно, какую категорию вы прос- матриваете: осень-зима, или же весна-лето –
              вы всегда сможете найти ва- рианты, подходящие вам по внешнему виду и цене.</li>
            <li>Мы несем ответственность за все товары.</li>
            <li>Молодые мамы будут рады обширному ассортименту детских моделей.</li>
          </ol>
          <p className="about-us__text">
            Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы зашли по верному адресу.
          </p>
          <p className="about-us__text">
          У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки и туфли. Сделав заказ в нашем интернет-магазине,
          вы сможете быть модным и стильным как осенью-зимой, так и весной-летом. Просто наберите номер нашего телефона, и мы
          поможем вам определиться с покупкой.</p>
        </Article>
      </div>
    );
  }
}
