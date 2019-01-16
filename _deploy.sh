npm run build
mv dist/game.js ./
git add index.html
git add game.js
git add assets/

git commit --allow-empty-message -m ''
git push origin gh-pages
