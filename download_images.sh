#!/bin/bash
mkdir -p public/images/slider public/images/logos

echo "Downloading slider images..."
cd public/images/slider
curl -sO https://madasweet.pl/wp-content/uploads/2021/09/JB-SLIDER.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2024/06/SLIDER-CHAMELEON-POP-kopia.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2024/06/SLIDER-HAPPY-TOOLS.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2023/06/MR-SQ-POP-SLIDER.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2023/05/ALIEN-CAR-SLIDER.jpg
cd ../../..

echo "Downloading logos..."
cd public/images/logos
curl -sO https://madasweet.pl/wp-content/uploads/2020/01/SPINER-CANDY-LOGO.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/SOUR-CRAZY-ROLL.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-2.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-3.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-4.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-5.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-7.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/dr.-lab-minic-andy.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-9.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-10.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-11.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-12.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-13.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/logo-14.jpg
curl -sO https://madasweet.pl/wp-content/uploads/2019/04/boom-spray-LOGO.jpg
cd ../../..

echo "Done"
