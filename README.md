# KK Restaurant website (React + Vite)

## Run
npm install
npm run dev

## Dish photos (one per dish, matched by dish name)
1. Get a free key: sign up at https://pixabay.com then open https://pixabay.com/api/docs/ (key is shown on that page).
2. npm run images -- YOUR_KEY        (downloads photos into public/dishes, about 3-5 minutes; re-run if it stops, it resumes)
3. Open review.html in a browser and check every photo against its dish name.
4. To replace any photo: put "Dish Name": "/dishes/myphoto.jpg" (or a full image URL) in src/manual.json.

## Food imagery
All menu cards now have a food image. Images are selected by dish name first and by a close dish-family fallback second, so the UI never intentionally leaves a menu card blank. The image library is documented in `IMAGE-LICENSE.md`.
