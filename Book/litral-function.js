const book = {
  title: "The Dead Sea",
  author: "Jamal Amoudi",
  isRead: false,
  toggleReadStatus: function () {
    this.isRead = !this.isRead;
  },
  describe: function () {
    return `["${this.title}" by ${this.author} : ${
      this.isRead ? "Read" : "Unread"
    } ]`;
  },
};

book.toggleReadStatus();
console.log(book.describe());

book.title = "The Atlantic";
book.author = "Jesob Karry";
book.toggleReadStatus;
console.log(book.describe());
