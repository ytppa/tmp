

class MyStorage {
    constructor() {
        // this.storage = localStorage;
    }

    getItem = aName => {
        const str = localStorage.getItem(aName);
        let arr = [];
        if (str === null) {
            localStorage.setItem(aName, JSON.stringify(arr))
        } else {
            arr = JSON.parse(str);
        }

        return arr;
    }

    getFavorites = ()  =>{
        const arr = this.getItem('favorites');
        return arr;
    }

    switchFavorite = (aId) => {
        const arr = this.getItem('favorites');
        const i = arr.findIndex(el => el === aId);

        if (i == -1) {
            arr.push(aId);
        } else {
            arr.splice(i ,1);
        }
        localStorage.setItem('favorites', JSON.stringify(arr));

        return arr;
    }

    updateFavoriteProducts = (aProducts) => {
        const arr = this.getItem('favorites');
        
        aProducts.forEach((product, index) => {
            product.favorite = arr.some(el => product.id == el);
            aProducts[index] = product;
        })
        return aProducts;
    }

    clear = (aName) => {
        return localStorage.removeItem(aName);
    }
};

var Storage = new MyStorage;

