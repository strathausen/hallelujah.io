<template>
  <div>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style lang='scss'>
// 1. Import the initial variables
@import '../node_modules/bulma/sass/utilities/initial-variables';
@import '../node_modules/bulma/sass/utilities/functions';

// 2. Set your own initial variables
// Update blue
$blue: darken(#72d0eb, 10);
// Add pink and its invert
$pink: #ffb3b3;
$pink-invert: #fff;
// Add a serif family
$family-serif: 'Merriweather', 'Georgia', serif;

// 3. Set the derived variables
// Use the new pink as the primary color
$primary: $pink;
$primary-invert: $pink-invert;
// Use the existing orange as the danger color
$danger: $orange;
// Use the new serif family
$family-primary: $family-serif;

// 4. Setup your Custom Colors
// $linkedin: #0077b5;
// $linkedin-invert: findColorInvert($linkedin);
// $twitter: #55acee;
// $twitter-invert: findColorInvert($twitter);
// $github: #333;
// $github-invert: findColorInvert($github);

// 5. Add new color variables to the color map.
// @import "../sass/utilities/derived-variables.sass";
// $addColors: (
//   "twitter":($twitter, $twitter-invert),
//   "linkedin": ($linkedin, $linkedin-invert),
//   "github": ($github, $github-invert)
// );
// $colors: map-merge($colors, $addColors);

// 6. Import the rest of Bulma
@import "../node_modules/bulma/bulma";
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  // text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #3B8070;
}

.title
{
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}

body {
  margin: 10%;
}

.bmc-button img {
  vertical-align: middle;
  margin-bottom: 5px;
}
</style>
