<template>
  <div id="app" ref="appHeading">
    <div class="columns is-centered">
      <a href="/">
        <h1 class="title is-1">Reblaze test app</h1>
      </a>
    </div>
    <SearchInput
      v-model="searchText" 
      @click="handleSearch" 
      @clear="handleClear"
      :isLoading="isLoading"
    />
    <SearchResult :images="images" v-if="showResults" />
  </div>
</template>

<script>
  import SearchInput from './components/SearchInput';
  import SearchResult from './components/SearchResult';
  import getData from './transport';
  export default {
    name: 'App',
    components: {
      SearchInput,
      SearchResult
    },
    data: () => ({
      searchText: '',
      images: [],
      showResults: false,
      page: 0,
      isLoading: false
    }),
    mounted() {
      this.$nextTick ( () => {
        window.addEventListener ( 'scroll', this.onScroll );
        this.onScroll();
      });
    },
    beforeDestroy() {
      window.removeEventListener ( 'scroll', this.onScroll );
    },
    methods: {
      async handleSearch() {
        const { searchText } = this;
        if ( searchText.length ) {
          this.isLoading = true;
          this.showResults = false;
          this.images = await getData ( searchText );
          this.isLoading = false;
          this.showResults = true;
        }
      },
      handleClear() {
        this.showResults = false;
        this.images = [];
        this.searchText = '';
      },
      async onScroll() {
        const { appHeading } = this.$refs;
        if ( appHeading ) {
            const bottomApp = appHeading.getBoundingClientRect().bottom;
            const { innerHeight } = window;
            if (( bottomApp - innerHeight ) < 150 && !this.isLoading ) {
              this.isLoading = true;
              const nextPageData = await getData ( this.searchText, ++this.page );
              this.images.push ( ...nextPageData );
              this.isLoading = false;
            }                               
        }
      }
    }
  }
</script>

<style>
  #app {
    margin-top: 60px;
    padding-bottom: 50px;
  }
</style>