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
  Blog: function () {
    var self = this;

    this.meta = {};

    // this.meta.date;
    // this.meta.by;
    // this.meta.name;
    // this.meta.genre;
    this.meta.title = {};

    this.meta.title.s = {};
    this.meta.title.l = {};

    // this.meta.title.s.text;
    // this.meta.title.l.text;

    this.meta.title.s.font = {
      button: {
        d: fonts.button.d,
        m: fonts.button.m,
      },
      blog: {
        d: fonts.blog.d,
        m: fonts.blog.m,
      },
    };

    // this.meta.image;
    // this.meta.file;
    // this.meta.published;

    this.share = {};

    this.share.twitter = {};
    // this.share.twitter.description;

    this.share.facebook = {};
    // this.share.facebook.url;

    this.setDate = function (date) {
      self.meta.date = date;
    };

    this.setBy = function (by) {
      self.meta.by = by;
    };

    this.setName = function (name) {
      self.meta.name = name;
    };

    this.setGenre = function (genre) {
      self.meta.genre = genre;
    };

    this.setShortTitle = function (title) {
      self.meta.title.s.text = title;
    };

    this.setLongTitle = function (title) {
      self.meta.title.l.text = title;
    };

    this.setShortTitleFont = function (font) {
      self.meta.title.s.font = font;
    };

    this.setLongTitleFont = function (font) {
      self.meta.title.l.font = font;
    };

    this.setImage = function (image) {
      self.meta.image = image;
    };

    this.setFile = function (file) {
      self.meta.file = file;
    };

    this.setPublished = function (published) {
      self.meta.published = published;
    };

    this.setTwitter = function (twitter) {
      this.share.twitter.description = twitter;
    };

    this.setFacebook = function (facebook) {
      this.share.facebook.url = facebook;
    };
  },
};
