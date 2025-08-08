function creatBook(title, author, isRead = false) {
  const book = {};
  book.title = title;
  book.author = author;
  book.isRead = isRead;
  book.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  };

  book.describe = function () {
    return `["${this.title}" by ${this.author} : ${
      this.isRead ? "Read" : "Unread"
    } ]`;
  };

  return book;
}

const user1 = creatBook("The Dead Sea", "Jamal Amoudi");
const user2 = creatBook("The Atlantic", "Jesob Karry");
user1.toggleReadStatus();
console.log(user1.describe());
console.log(user2.describe());
