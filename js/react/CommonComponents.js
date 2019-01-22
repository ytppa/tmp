
const { Route, Switch, Link, Prompt, BrowserRouter } = ReactRouterDOM;
// const { CookiesProvider, withCookies, Cookies } = reactCookie;



const withData = (endpoint, dataToState, isChangeable) => Component => class extends React.Component {
  constructor(props) { super(props); this.state = {}; }
  static get displayName() {
    const name = Component.displayName || Component.name || 'Component';
    return `WithData(${name})`;
  }
  fetchData(props) {
    const apiUrl = 'https://neto-api.herokuapp.com/bosa-noga';
    if (typeof endpoint === 'function') {
      endpoint = endpoint(props);
    }

    fetch(apiUrl + endpoint)
      .then( result => result.json() )
      .then( json => {
        if (json.status == 'ok') {
          this.setState( dataToState(json.data) );
        } 
      });
  }
  componentWillReceiveProps(nextProps) {
    if (isChangeable) 
      this.fetchData(nextProps);
  }
  componentDidMount() {
    this.fetchData(this.props);
  }
  render() {
    return <Component {...this.props} {...this.state} />;
  };
}

withData.defaultProps = {
  isChangeable: true
}