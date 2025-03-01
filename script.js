const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

const users = {
  "rafat":    { likes: 10, followers: 50, following: 30 },
  "shubham":  { likes: 25, followers: 80, following: 60 },
  "radhey":   { likes: 5, followers: 20, following: 15 },
  "sanskar":  { likes: 15, followers: 60, following: 45 },
  "yash":     { likes: 8, followers: 40, following: 25 },
  "dev":      { likes: 20, followers: 90, following: 70 },
  "prem":     { likes: 12, followers: 55, following: 40 }
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:u', (req, res) => {
    console.log('Request received for:', req.params.u);
    const { u } = req.params;

    if (users[u]) {
      res.render('found.ejs', {u, likes : users[u].likes, followers : users[u].followers, following : users[u].following});
    } else {
      res.render('notfound.ejs', {u});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
