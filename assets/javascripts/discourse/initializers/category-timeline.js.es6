import TopicNavigation from 'discourse/components/topic-navigation';
import Topic from 'discourse/models/topic';
import computed from 'ember-addons/ember-computed-decorators';

export default {
  name: "category-timeline",

  initialize(container) {

    TopicNavigation.reopen({

      _performCheckSize() {
        if (!this.element || this.isDestroying || this.isDestroyed) { return; }

        let info = this.get('info');

        if (info.get('topicProgressExpanded')) {

          info.setProperties({
            renderTimeline: true,
            renderAdminMenuButton: true
          });

        } else {

          let renderTimeline = !this.site.mobileView;

          if (renderTimeline) {

            const width = $(window).width();
            let height = $(window).height();

            if (this.get('composerOpen')) {
              height -= $('#reply-control').height();
            }

            renderTimeline = false && width > 960 && height > 520;
          }

          info.setProperties({
            renderTimeline,
            renderAdminMenuButton: !renderTimeline
          });
        }
      }

    });

    Topic.reopen({

    });

  }
};
