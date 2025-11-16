class Product {
    #starting_p = 0

    constructor(name, imgs = [], id, sizes = {}, starting_p, thumbnail = 0, allow_custom = false) {
        this.name = name
        this.imgs = imgs
        this.thumbnail = thumbnail 
        this.id = id
        this.sizes = sizes
        this.#starting_p = starting_p
        this.actual_starting_p = starting_p + Object.values(this.sizes).sort()[0]
        this.allow_custom = allow_custom
        Object.freeze(this)
    }

    get startingPrice() {
        return this.actual_starting_p
    }

    get imgThumbnail() {
        return this.imgs[this.thumbnail]
    }

    getPrice(size) {
        return this.#starting_p + this.sizes[size]
    }
}

export default Product
