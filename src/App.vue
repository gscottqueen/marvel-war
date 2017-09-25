
<template>
  <div id="app">
    <button type="button" name="button" @click="fetchData">Get Data<span class="carrot"></span></button>
    <div id="data-vue">
      <dot-loader v-show="loading" :loading="laoding" :color="color" :size="size"></dot-loader>
        <div class="character-card" v-for="character in characters">
          <div class="character-name-wrapper">
            <div class="character-name">{{ character.name }}</div>
          </div>
          <img class="character-image" :src="thumbnailSrc(character.thumbnail)"></img>
          <div class="character-description-wrapper">
            <div class="character-description">
              <div class="character-description-comics">{{ character.description }}</div>
              <ul>
                <li class="character-description-comics">
                  <span>Comics available: <span class="digit">{{ character.comics.available }}</span></span>
                </li>
                <li class="character-description-series">
                  <span>Series available: <span class="digit">{{ character.series.available }}</span>
                  </span>
                </li>
                <li class="character-description-stories">
                  <span>Stories available: <span class="digit">{{ character.stories.available }}</span>
                </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<!-- our script -->
<script>
//import globals
import {api} from './api.js';
//setting a loader animation
import DotLoader from 'vue-spinner/src/DotLoader.vue';

//our data
export default {
  name: 'app',
  components: {
    DotLoader,
  },
  data() {
    return {
      characters: [],
      thumbnailSuffix: '/portrait_uncanny',
      color: '#41b883',
      size: '90px',
      loading: false,
  };
},
  methods: {
    fetchData() {
      //turn our spinner on
      this.loading = true;
      // make a request to our endpoint
      api.get('/v1/public/characters?orderBy=name&offset=100')
      .then(characterResponse => {
        //log a response
        // console.log(characterResponse);

        // set up our variables
        var characters = characterResponse.data.data.results;
        var noImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';

        // create and indexed array of the characters
        for (var i=0; i<characters.length; i++) {
          //remove the returns with no images
          if (characters[i].thumbnail.path != noImage) {
            // push the index to our data
            this.characters.push(characters[i]);
            //turn our spinner off
            this.loading = false;
          }
        }
      })
    },
    // pass our src through to build our full path
    thumbnailSrc(src) {
      // return the thumbnail pat add the suffix and close with the extension in data
      return src.path + this.thumbnailSuffix + "." + src.extension;
    }
  }
}
</script>

<!-- our styles -->
<style lang="scss">

$green: #41b883;

  button {
    padding: 20px 30px;
    margin: 30px;
    border: 0;
    background-color: transparent;
    text-transform: uppercase;
    font-size: 18px;
    cursor: pointer;
    color: #2c3e50;
    font-weight: bold;
    border: 4px solid $green;
    border-spacing: 2px;
  }

  #data-vue {
    margin: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

    .character-card {
      width: 300px;
      max-width: 300px;
      max-height: 510px;
      margin: 40px 25px;
      //flex
      display: flex;
      flex-direction: column;
      align-content: center;
      flex: 1 1 auto;
      //dropshadow
      -ms-box-shadow: 0px 0px 44px -21px rgba(0,0,0,0.48);
      -webkit-box-shadow: 0px 0px 44px -21px rgba(0,0,0,0.48);
      -moz-box-shadow: 0px 0px 44px -21px rgba(0,0,0,0.48);
      box-shadow: 0px 0px 44px -21px rgba(0,0,0,0.48);
      //our interactive css
      -ms-transition: .75s;
      -webkit-transition: .75s;
      -moz-transition: .75s;
      transition: .75s;

      &:hover {
        cursor: url(assets/spideycursor.png), pointer;
        box-shadow: 0px 0px 44px -21px rgba(65,184,131,1);
        -ms-transform: scale(1.1) rotateY(180deg); /* IE 9 */
        -webkit-transform: scale(1.1) rotateY(180deg);
        -moz-transform: scale(1.1) rotateY(180deg);
        transform: scale(1.1) rotateY(180deg);

        .character-name {
          display: none;
        }

        .character-description-wrapper {
          display: block;
        }

        img {
          display: none;
        }

      }

      .character-name-wrapper {
        background-color: $green;
        width: 100%;
        min-height: 90px;

        .character-name {
          font-family: "Impact", sans-serif;
          font-size: 20px;
          text-transform: uppercase;
          color: white;
          padding: 20px;
        }

      }

      .character-image {
        width: 100%;
        height: 100%;
        min-height: 350px;
        // min-width: 350px;
      }

      .character-description-wrapper {
        position: absolute;
        z-index: -1;
        background-color: white;
        height: 100%;
        min-height: 440px;
        width: 100%;
        max-width: 300px;
        display: none;

        .character-description {
          font-family: sans-serif;
          word-wrap: break-word;
          margin-top: 110px;
          padding: 20px;
          max-width: 260px;
          transform: rotateY(180deg);

          ul {
            list-style: square;
            color: $green;
            padding-left: 20px;
            margin: 2rem 0;

            li {
              margin: 1rem 0;

              span {
                color: black;
                font-weight: bold;

                .digit {
                  font-weight: normal;
                }

              }

            }

          }

        }

      }

    }

</style>
