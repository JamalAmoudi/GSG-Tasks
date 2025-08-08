// Constructor-Function

function Book(title, author, isRead = false) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;

  this.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  };

  this.describe = function () {
    return `["${this.title}" by ${this.author} : ${
      this.isRead ? "Read" : "Unread"
    } ]`;
  };
}

const user1 = new Book("The Dead Sea", "Jamal Amoudi");
const user2 = new Book("The Atlantic", "Jesob Karry");
user1.toggleReadStatus();
console.log(user1.describe());
console.log(user2.describe());
