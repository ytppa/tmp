

const Price = ({value}) => {
  let result = typeof value == 'number' ? value.toLocaleString() : '0';
  return (
    <div className="price">{value} ₽</div>
  );
}


class Similar extends React.Component {
  render() {
    return(
      <section className="product-card__similar-products-slider">
        {/* Слайдер "Похожие товары" */}
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
            <div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item">
              <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-1.png" className="similar-products-slider__item-pic-1" alt="Ботинки женские" />
              </a>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
              <p className="similar-products-slider__item-price">23 150</p>
            </div>    
            </div>
            <div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item">
              <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-2.png" className="similar-products-slider__item-pic-2" alt="Полуботинки женские" /></a>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">Полуботинки женские</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Shoes Market</span></p>
              <p className="similar-products-slider__item-price">4 670</p>
            </div>    
            </div>
            <div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item">
              <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-3.png" className="similar-products-slider__item-pic-3" alt="Ботинки женские" /></a>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Menghi Shoes</span></p>
              <p className="similar-products-slider__item-price">6 370</p>
            </div>
            </div>
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>
        </div>
      </section>
    );
  }
}


class OverLooked extends React.Component {
  render() {
    return(
      <section className="product-card__overlooked-slider">
        {/*<!-- Слайдер "Вы смотрели" -->*/}
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
          <div className="overlooked-slider__item overlooked-slider__item-1">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-2">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-3">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-4">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-5">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
        </div>
      </section>
    );
  }
}


class ProductCardSlider extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      images: this.props.images ? this.props.images : [], 
      visible: this.props.visible,
      position: 0
    }; 
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { images, visible } = newProps,
          newState = { images, visible, position: 0};
    this.setState(newState);
  }

  handleUpClick(event) {
    event.preventDefault();
    if ( this.state.images.length <= this.state.visible || this.state.position == 0) return null;
    
    const newPosition = (this.state.position > 0) ? (this.state.position - 1) : 0;
    
    this.setState({ position: newPosition });
  }

  handleDownClick(event) {
    event.preventDefault();
    if ( this.state.images.length <= this.state.visible 
      || this.state.position == (this.state.images.length - 1 - this.state.visible) ) return null;
    const newPosition = (this.state.position < (this.state.images.length - 1 - this.state.visible)) 
      ? (this.state.position + 1) 
      : (this.state.position < (this.state.images.length - 1 - this.state.visible));
    
    this.setState({ position: newPosition });
  }

  render() {
    const { images, position, visible } = this.state,
          { onSelect } = this.props;

    if (images.length <= 1) return null;

    let visibleImages = images
                          .slice(position, position + visible)
                          .map((value, index) => { return ({ key: index, url: value }) });
    return(
      <section className="main-screen__favourite-product-slider">
        <div className="favourite-product-slider">
          { 
            (images.length > visible) 
              ? (<div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up" onClick={this.handleUpClick}></div>) 
              : null
          }
          {
            visibleImages.map((image, index) => {
              const styles = { 
                backgroundImage: 'url("' + image.url + '")',
                backgroundSize: 'contain'
              }; 
              return( 
                <div 
                  key={image.key} 
                  className={`favourite-product-slider__item favourite-product-slider__item-${index+1}`}
                  style={styles}
                >
                  <a href={image.url} data-id={image.key} onClick={onSelect}></a>
                </div> 
              );
            })
          }
          { 
            (images.length > visible) 
              ? (<div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down" onClick={this.handleDownClick}></div>) 
              : null
          }
          
        </div>
      </section>
    );
  }
}


const ProductCardImage = ({ image, alt }) => {
  return (
    <div className="main-screen__favourite-product-pic">
      <a href="#"><img src={ image } alt={ alt } /></a>
      <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
    </div>
  );
}


const ProductCardProductInfo = ({ product, selectedSize, onSizeSelect, onQuantityIncrease, onQuantityDecrease, quantity }) => {
  const { 
          brand, 
          categoryId, 
          color, 
          feature, 
          heelSize, 
          id, 
          material, 
          popularity, 
          price, 
          reason, 
          season, 
          sizes, 
          sku, 
          title, 
          type 
        } = product;
  return (
    <div className="main-screen__product-info">
      <div className="product-info-title">
        <h2>Ботинки женские</h2>
        { product.feature ? (<div className="in-stock">В наличии</div>) : null }
      </div>
      <div className="product-features">
        <table className="features-table">
          <tbody>
            <tr>
              <td className="left-col">Артикул:</td>
              <td className="right-col">{product.sku}</td>
            </tr>
              <tr>
              <td className="left-col">Производитель:</td>
              <td className="right-col"><a href="#"><span className="producer">{product.brand}</span></a></td>
            </tr>
              <tr>
              <td className="left-col">Цвет:</td>
              <td className="right-col">{product.color}</td>
            </tr>
              <tr>
              <td className="left-col">Материалы:</td>
              <td className="right-col">{product.material}</td>
            </tr>
              <tr>
              <td className="left-col">Сезон:</td>
              <td className="right-col">{product.season}</td>
            </tr>
              <tr>
              <td className="left-col">Повод:</td>
              <td className="right-col">{product.reason}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="size">Размер</p>
      <ul className="sizes">
        { sizes.map((item) => {
          if (item.available) {
            return(
              <li key={item.size} className={ (item.size == selectedSize) ? 'active' : null }>
                <a href="#" onClick={onSizeSelect}>{item.size}</a>
              </li>
            );
          } else {
            return(<li key={item.size}>{item.size}</li>);
          }
          
        }) }
      </ul>
      <div className="size-wrapper">
        <a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
      </div>
      <a href="#" className="in-favourites-wrapper">
        <div className="favourite" href="#"></div><p className="in-favourites">В избранное</p>
      </a>
      <div className="basket-item__quantity">
        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={onQuantityDecrease}>-</div>
        {quantity}
        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={onQuantityIncrease}>+</div>
      </div>
      <Price value={product.price}/>
      <button className="in-basket in-basket-click">В корзину</button>
    </div>
  );
}

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      product: null,
      selectedImage: null,
      selectedSize: null,
      quantity: 1
    }
    this.handleThumbSelect = this.handleThumbSelect.bind(this);
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this);
    this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this);
  }

  componentWillReceiveProps(newProps) {
    let newState = {};
    const { product } = newProps;

    if (typeof product == 'object') {
      newState = {
        product,
        quantity: 1
      };
      
      if (product.images && product.images.length) 
        newState.selectedImage = 0;

      if (product.sizes.length) 
        newState.selectedSize = product.sizes[0];
      
      this.setState( newState );
    }
  }

  handleThumbSelect(event) {
    event.preventDefault(); 
    const elemId = event.currentTarget.getAttribute('data-id');
    this.setState({ selectedImage: elemId });
  }

  handleSizeSelect(event) {
    event.preventDefault(); 
    const elemId = event.currentTarget.innerHTML;
    if (elemId != this.state.selectedSize)
      this.setState({ selectedSize: elemId });
  }

  handleQuantityDecrease(event) {
    const { quantity } = this.state;
    if (quantity==1) return null;
    this.setState({ quantity: (quantity > 1) ? (quantity - 1) : 1 });
    event.preventDefault(); 
  }

  handleQuantityIncrease(event) {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
    event.preventDefault();
  }
    
  render() {
    const { product, selectedImage, selectedSize, quantity } = this.state;
    if (!product) return null;
    const { title, images } = product,
          image = images[selectedImage]; 
    
    return(
      <main className="product-card">
        {/* Тело карточки товара */}
        <section className="product-card-content">
          <h2 className="section-name">{title}</h2>
          <section className="product-card-content__main-screen">
            {/* Слайдер выбранного товара */}
            <ProductCardSlider images={images} onSelect={this.handleThumbSelect} visible={3} />
            {/* Изображение выбранного товара */}
            <ProductCardImage image={image} alt={title} />
            {/* Блок информации о товаре */}
            <ProductCardProductInfo 
              product={product} 
              selectedSize={selectedSize} 
              onSizeSelect={this.handleSizeSelect}
              quantity={quantity} 
              onQuantityIncrease={this.handleQuantityIncrease} 
              onQuantityDecrease={this.handleQuantityDecrease} 
            />
          </section>
        </section>
      </main>
    );
  }
}

const ProductCardWithData = withData(({id}) => `/products/${id}`, data => ({ product: data }), true) (ProductCard);


class BreadCrumbs extends React.Component {
  render() {
    return(
      <div className="site-path">
        {/*<!-- Breadcrumbs -->*/}
        <ul className="site-path__items">
        <li className="site-path__item"><Link to="/">Главная</Link></li>
        <li className="site-path__item"><Link to="#">Женская обувь</Link></li>
        <li className="site-path__item"><Link to="#">Ботинки</Link></li>
        <li className="site-path__item"><Link to="#">Ботинки женские</Link></li>
        </ul>
      </div>
    );
  }
}


class ProductCardDesktopPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const id = (this.props.match && this.props.match.params && this.props.match.params.id) ? this.props.match.params.id : null;
    if (!id) return null;
    return(
      <div>  
        {/*<!-- Карточка товара -->*/}
        <ProductCardWithData id={id}/>
        {/*<!-- Слайдеры внизу карточки  -->*/}
        <OverLooked />
        <Similar />
      </div>
    );
  }
}