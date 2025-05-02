class Notification {
    constructor({visible = false, message = "", link = "", linkText = ""}) {
        this.visible = visible
        this.message = message
        this.link = link
        this.linkText = linkText
    }
}

module.exports = Notification
