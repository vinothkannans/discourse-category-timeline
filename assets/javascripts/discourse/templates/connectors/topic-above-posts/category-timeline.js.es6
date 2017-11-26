import computed from 'ember-addons/ember-computed-decorators';

export default {
  topic: null,

  @computed
  timelineTopics: function () {
    return this.topic.timelineTopics();
  },

  setupComponent(args, component) {
    this.topic = args.model;
  }
}
