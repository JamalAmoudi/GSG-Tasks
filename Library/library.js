class LibraryItem {
  #id;
  constructor(title) {
    this.title = title;
    this.#id = LibraryItem.makeId();
    // this.#id = this.constructor.makeId();
  }

  describe() {
    return `[${this.title}]`;
  }

  getId() {
    return this.#id;
  }

  static makeId() {
    return Math.floor(Math.random() * 10000);
  }
}

class Book extends LibraryItem {
  constructor(title, author, isRead = false) {
    super(title);
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }

  toggleReadStatus = function () {
    this.isRead = !this.isRead;
  };

  describe() {
    return `[ Book ID: "${this.getId()}" , Book Title: "${this.title}" by ${
      this.author
    } : ${this.isRead ? "Read" : "Unread"} ]`;
  }
}

const book1 = new Book("Atomic Habits", "James Clear");
const book2 = new Book("Aother One", "anyone!");
book1.describe();

//book2.toggleReadStatus();
//book2.describe();
