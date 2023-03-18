import moment from 'moment';

var fonts = {
  button: {
    d: 'font-15',
    m: 'font-30',
  },
  blog: {
    d: 'font-30',
    m: 'font-30',
  },
};

export default {
  Blog: function (blog) {
    var self = this;

    self.date = moment(blog.date).format('YYYY-MM-DD');
    self.by = blog.by;
    self.id = blog.name;
    self.genre = blog.genre;
    self.title = blog.title;
    self.description = blog.description;
    self.file = blog.file;
    self.image = blog.image;
    self.published = blog.published;

    // this.meta = {};

    // this.meta.date;
    // this.meta.by;
    // this.meta.name;
    // this.meta.genre;
    // this.meta.title = {};

    // this.meta.title.s = {};
    // this.meta.title.l = {};

    // this.meta.title.s.text;
    // this.meta.title.l.text;

    // this.meta.title.s.font = {
    //   button: {
    //     d: fonts.button.d,
    //     m: fonts.button.m,
    //   },
    //   blog: {
    //     d: fonts.blog.d,
    //     m: fonts.blog.m,
    //   },
    // };

    // this.meta.image;
    // this.meta.file;
    // this.meta.published;

    // this.share = {};

    // this.share.twitter = {};
    // this.share.twitter.description;

    // this.share.facebook = {};
    // this.share.facebook.url;

    // ############################### setter functions ###############################
    // this.setDate = function (date) {
    //   self.date = moment(date).format('YYYY-MM-DD');
    // };

    // this.setBy = function (by) {
    //   self.by = by;
    // };

    // this.setName = function (name) {
    //   self.id = name;
    // };

    // this.setGenre = function (genre) {
    //   self.genre = genre;
    // };

    // this.setShortTitle = function (title) {
    //   self.title = title;
    // };

    // this.setLongTitle = function (title) {
    //   self.description = title;
    // };

    // this.setShortTitleFont = function (font) {
    //   // self.meta.title.s.font = font;
    // };

    // this.setLongTitleFont = function (font) {
    //   // self.meta.title.l.font = font;
    // };

    // this.setImage = function (image) {
    //   self.image = image;
    // };

    // this.setFile = function (file) {
    //   // self.file = file;
    // };

    // this.setPublished = function (published) {
    //   self.published = published;
    // };

    // this.setTwitter = function (twitter) {
    //   // this.share.twitter.description = twitter;
    // };

    // this.setFacebook = function (facebook) {
    //   // this.share.facebook.url = facebook;
    // };
  },
};
