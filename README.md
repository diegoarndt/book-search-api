# 📚 Book Search API

This is a pretty basic node.js app that uses the Open Library API to search for books published in a specific year.

## 🚀 Installation
- Clone this repository to your local machine.
- Run `npm install` to install the dependencies.

## 📖 Usage
To search for books published in a specific year, run the following command:
```bash
node app.js <title> [year] [limit]
```

Where <title> is the book name or location, [year] (optional) is the year you want to search for, and [limit] (optional) is the maximum number of results to return (default is 5).

Example usage:
```bash
node app.js canada 2022 10
```

This will search for books related to Canada published in the year 2022 and return a maximum of 10 results.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## 🙏 Acknowledgments

This project has been created for the Web Application Programming course assignment (WDDM-120-0NA) at Humber College, Toronto. 🎓
