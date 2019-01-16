git checkout master .

npm run build
cp dist/game.js ./
cp node_modules/phaser/dist/phaser.min.js ./

git add index.html
git add game.js
git add assets/
git add phaser.min.js

git commit --allow-empty-message -m ''
git push origin gh-pages
