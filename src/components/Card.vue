<template>
    <div class="card">
        <div class="card-image">
            <a :href="link" target="_blank">
                <figure class="image is-4by3">
                    <img :src="src" v-if="type === 'image'" />
                    <video draggable="false" v-if="type === 'video'" autoplay playsinline loop muted>
                        <source type="video/mp4" :src="src">
                    </video>
                </figure>
            </a>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-6">{{ title }}</p>
                </div>
            </div>
            <div class="content">
                <a v-for="tag in tags" :key="tag.id" :href="tag.src" target="_blank">
                    #{{ tag.name }}
                </a>
                <br>
                <time :datetime="datetime" class="is-size-7">{{datetime}}</time>
            </div>
        </div>
    </div>
</template>

<script>
    import { timestampToDate } from '../util';
    export default {
        name: 'Card',
        props: [ 'image' ],
        data: () => ({
            src: '',
            datetime: '',
            title: '',
            tags: [],
            type: '',
            link: '#'
        }),
        mounted() {
            const { image } = this.$props;
            const imgData = image.images && image.images.length ? image.images[0] : image;
            this.src = imgData.link;
            this.datetime = timestampToDate ( imgData.datetime );
            this.type = imgData.type.includes ( 'image' ) ? 'image' : 'video';
            if ( image.title ) {
                this.title = image.title;
            }
            if ( image.tags ) {
                this.tags = image.tags.map (( tag, id ) => ({
                    id,
                    name: tag.display_name,
                    src: `https://imgur.com/t/${tag.name}`
                }));
            }
            if ( image.link ) {
                this.link = image.link;
            }
        }
    }
</script>

<style scoped>
    video {
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 100%;
    }
    figure.image {
        background: url(../assets/loading.gif) center center no-repeat;
        background-size: cover;
    }
</style>